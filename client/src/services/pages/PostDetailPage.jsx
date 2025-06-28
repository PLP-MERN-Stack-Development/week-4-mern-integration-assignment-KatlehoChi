import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    postService
      .getPost(id)
      .then((data) => setPost(data))
      .catch(() => setError('Could not load post'));
  }, [id]);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(id);
        navigate('/');
      } catch {
        alert('Failed to delete post');
      }
    }
  };

  if (error) {
    return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;
  }

  if (!post) {
    return <p style={{ textAlign: 'center' }}>Loading post...</p>;
  }

  return (
    <div style={styles.container}>
      <h2>{post.title}</h2>
      <p>
        <em>
          By {post.author?.username || 'Unknown'} •{' '}
          {new Date(post.createdAt).toLocaleString()}
        </em>
      </p>
      <div style={styles.content}>
        <p>{post.content}</p>
      </div>

      {user?._id === post.author?._id && (
        <div style={styles.actions}>
          <button
            style={styles.button}
            onClick={() => navigate(`/edit/${post._id}`)}
          >
            Edit
          </button>
          <button style={styles.delete} onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '1rem',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  content: {
    marginTop: '1rem',
    lineHeight: '1.6',
  },
  actions: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#333',
    color: '#fff',
    cursor: 'pointer',
  },
  delete: {
    padding: '0.5rem 1rem',
    border: 'none',
    backgroundColor: '#b91c1c',
    color: '#fff',
    cursor: 'pointer',
  },
};

export default PostDetailPage;