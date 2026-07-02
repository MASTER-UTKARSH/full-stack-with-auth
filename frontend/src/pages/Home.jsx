import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch (error) {
      alert('Error deleting post');
    }
  };

  // Extract all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(p => p.tags || []).map(t => t.toLowerCase()))
  );

  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags?.some(t => t.toLowerCase() === selectedTag))
    : posts;

  if (loading) return <div className="loading" style={{ marginTop: '100px' }}>Loading the feed...</div>;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', paddingBottom: '80px' }}>
      <div className="hero-glow"></div>
      
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '80px 24px 60px 24px',
        position: 'relative',
        zIndex: 1
      }} className="fade-in">
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '56px',
          fontWeight: '700',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Whispers & Ideas
        </h1>
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '18px',
          maxWidth: '540px',
          margin: '0 auto 32px auto'
        }}>
          Explore articles on design, code, and life, shared by creators around the world.
        </p>

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div style={{
            display: 'flex',
            gap: '8px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            <button
              onClick={() => setSelectedTag('')}
              className="badge"
              style={{
                background: !selectedTag ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: !selectedTag ? 'white' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              All Posts
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="badge"
                style={{
                  background: selectedTag === tag ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: selectedTag === tag ? 'white' : 'var(--text-secondary)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Posts */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {filteredPosts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            color: 'var(--text-muted)',
            padding: '80px 20px',
            background: 'var(--card-bg)',
            borderRadius: '20px',
            border: '1px solid var(--card-border)'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>No posts found.</p>
            <p style={{ fontSize: '14px' }}>Be the first one to create a new post!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '30px'
          }}>
            {filteredPosts.map(post => (
              <PostCard key={post._id} post={post} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
