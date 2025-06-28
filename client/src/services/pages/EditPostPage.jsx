import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '../services/api';
import { useAuth } from '../context/AuthContext';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    postService.getPost(id)
      .then((data) => {
        if (user?._id !== data.author?._id) {
          navigate('/');
        } else {
          setTitle(data.title);
          setContent(data.content);
        }
      })
      .catch(() => setError('Could not load post'));
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await postService.updatePost(id, { title, content });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="Update your content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Update</button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#fdfdfd',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    fontSize: '1.1rem',
  },
  textarea: {
    padding: '0.75rem',
    fontSize: '1rem',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default EditPostPage;