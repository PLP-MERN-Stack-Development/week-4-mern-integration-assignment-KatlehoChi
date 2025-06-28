import { usePosts } from '../hooks/usePosts';
import { Link } from 'react-router-dom';

function HomePage() {
  const { posts, error, loading } = usePosts();

  return (
    <div style={styles.container}>
      <h1>Welcome to the MERN Blog</h1>
      <p>homepage where posts will be listed.</p>

      <h2 style={styles.subheading}>Recent Posts</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p style={styles.error}>{error}</p>}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link
            to={`/posts/${post._id}`}
            key={post._id}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={styles.card}>
              <h3>{post.title}</h3>
              <p>{post.excerpt || post.content?.substring(0, 100)}...</p>
              <small>By {post.author?.username || 'Unknown'}</small>
            </div>
          </Link>
        ))
      ) : (
        !loading && <p>No posts yet. Be the first to write one!</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '0 1rem',
  },
  subheading: {
    marginTop: '2rem',
  },
  card: {
    border: '1px solid #ddd',
    padding: '1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    background: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};

export default HomePage;