import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '', tags: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };
      await axios.post('/api/posts', payload);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post. Please try again.');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '800px', padding: '60px 20px' }}>
      <div className="card fade-in" style={{ padding: '40px' }}>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '32px',
          fontWeight: '600',
          marginBottom: '24px'
        }}>
          Create New Post
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
              placeholder="Give your article a title..."
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
              placeholder="Start writing..."
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              style={{ lineHeight: '1.7', resize: 'vertical' }}
            />
          </div>

          <div className="form-group">
            <label>TAGS (comma separated)</label>
            <input
              type="text"
              placeholder="design, coding, tutorial"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginTop: '6px' }}>
              Separate tags with commas. E.g. "productivity, learning"
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
            <button type="submit" className="btn btn-primary">
              Publish Post
            </button>
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
