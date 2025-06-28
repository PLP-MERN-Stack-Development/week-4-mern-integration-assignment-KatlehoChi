import { useEffect, useState } from 'react';
import { postService } from '../services/api';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    postService
      .getAllPosts()
      .then((data) => setPosts(data.posts || []))
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  }, []);

  return { posts, error, loading };
}