import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post, onDelete }) {
  const { user } = useAuth();
  const isAuthor = user && post.author._id === user._id;

  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '26px',
            lineHeight: '1.3',
            fontWeight: '600'
          }}>
            <Link to={`/post/${post._id}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', transition: 'color 0.2s' }}>
              {post.title}
            </Link>
          </h2>
          {isAuthor && (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to={`/edit/${post._id}`} className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '15px' }}>
                Edit
              </Link>
              <button onClick={() => onDelete(post._id)} className="btn btn-danger" style={{ padding: '6px 12px', fontSize: '13px', borderRadius: '15px' }}>
                Delete
              </button>
            </div>
          )}
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
          <div style={{
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '9px',
            fontWeight: 'bold',
            color: 'var(--text-secondary)'
          }}>
            {post.author?.username?.charAt(0).toUpperCase()}
          </div>
          <span>By {post.author?.username || 'Anonymous'}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>

      <p style={{
        color: 'var(--text-secondary)',
        fontSize: '15px',
        lineHeight: '1.7',
        display: '-webkit-box',
        WebkitLineClamp: '3',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {post.content}
      </p>

      {post.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
          {post.tags.map((tag, i) => (
            <span key={i} className="badge">
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <Link to={`/post/${post._id}`} style={{
          color: '#a78bfa',
          textDecoration: 'none',
          fontSize: '14px',
          fontWeight: '500',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Read Article <span>→</span>
        </Link>
      </div>
    </div>
  );
}
