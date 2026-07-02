import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditPost() {
  const { id } = useParams();
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`/api/posts/${id}`);
      setFormData({
        title: res.data.title,
        content: res.data.content,
        tags: res.data.tags?.join(', ') || ''
      });
    } catch (err) {
      setError('Failed to load post details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await axios.put(`/api/posts/${id}`, payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post.');
    }
  };

  if (loading) return <div className="loading" style={{ marginTop: '100px' }}>Loading article editor...</div>;

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
      <div className="card fade-in" style={{ padding: '40px' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          Edit Post
        </h2>
        
        {error && (
          <div className="error-box">
            <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>POST TITLE</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              style={{ fontSize: '18px', fontWeight: '500' }}
            />
          </div>

          <div className="form-group">
            <label>ARTICLE CONTENT</label>
            <textarea
              required
              rows={12}
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              style={{ lineHeight: '1.7', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label>TAGS (comma separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
            <button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
