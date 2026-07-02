import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post permanently?')) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      navigate('/');
    } catch (err) {
      alert('Error deleting post');
    }
  };

  if (loading) return <div className="loading" style={{ marginTop: '100px' }}>Loading article...</div>;
  if (!post) {
    return (
      <div className="container" style={{ maxWidth: '600px', padding: '100px 20px', textAlign: 'center' }}>
        <div className="card">
          <h2 style={{ fontFamily: 'var(--font-serif)', marginBottom: '16px' }}>Article Not Found</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
            The article you are looking for does not exist or may have been deleted.
          </p>
          <Link to="/" className="btn btn-primary">Back to Feed</Link>
        </div>
      </div>
    );
  }

  const isAuthor = user && post.author?._id === user._id;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '80px' }}>
      <div className="hero-glow"></div>
      
      <div className="container" style={{ maxWidth: '780px', padding: '60px 20px', position: 'relative', zIndex: 1 }}>
        <article className="card fade-in" style={{ padding: '48px' }}>
          
          {/* Header */}
          <header style={{ marginBottom: '32px' }}>
            {post.tags?.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {post.tags.map((tag, i) => (
                  <span key={i} className="badge" style={{ fontSize: '11px' }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
            
            <h1 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '44px',
              lineHeight: '1.2',
              fontWeight: '700',
              marginBottom: '20px'
            }}>
              {post.title}
            </h1>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '20px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-secondary)',
              fontSize: '14px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #a78bfa 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '13px',
                  color: 'white'
                }}>
                  {post.author?.username?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontWeight: '500', color: 'var(--text-primary)' }}>
                    {post.author?.username || 'Anonymous'}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                    Author
                  </div>
                </div>
              </div>
              
              <div>
                {new Date(post.createdAt).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div style={{
            fontSize: '17px',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
            marginBottom: '40px',
            whiteSpace: 'pre-wrap',
            letterSpacing: '0.2px'
          }}>
            {post.content}
          </div>

          {/* Actions Footer */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '32px',
            marginTop: '32px'
          }}>
            <Link to="/" className="btn btn-secondary">
              ← Back to Feed
            </Link>
            
            {isAuthor && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to={`/edit/${post._id}`} className="btn btn-primary">
                  Edit Article
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete
                </button>
              </div>
            )}
          </div>

        </article>
      </div>
    </div>
  );
}
