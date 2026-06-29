import { useState, useEffect, useMemo } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Posts from './pages/Posts';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';
import PostNew from './pages/PostNew';
import PostEdit from './pages/PostEdit';

function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // let alive = true; // 상품 조회 시작.. 열일 중..
    const controller = new AbortController();

    async function fetchData() {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}/data/blog.json`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('메시지');
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error(e);
        setPosts([]); // 에러 시 목록 비움
      } finally {
        setLoaded(true);
      }
    }
    fetchData();

    return () => {
      // alive = alive;
      controller.abort();
    }; //정리함수
  }, []);

  const onDelete = (_id) => {
    setPosts((prev) => prev.filter((post) => post.id !== _id));
  };
  const newId = useMemo(() => {
    const maxId = posts.reduce((acc, current) => {
      return Math.max(acc, current.id);
    }, 0);
    return maxId + 1;
  }, [posts]);

  const onCreate = ({ title, content }) => {
    const newPost = {
      title: title,
      content: content,
      id: newId,
      createAt: new Date().toISOString().slice(0, 10),
    };

    setPosts((prev) => {
      return [...prev, newPost];
    });

    return newPost.id;
  };

  const onUpdate = (_id, { title, content }) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === _id
          ? {
              ...post,
              title: title,
              content: content,
            }
          : p,
      ),
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout loaded={loaded} />}>
          <Route index element={<Home posts={posts} />} />
          <Route path="posts" element={<Posts posts={posts} />} />
          <Route path="post/:id" element={<PostDetail posts={posts} onDelete={onDelete} />} />
          <Route path="post/edit/:id" element={<PostEdit posts={posts} onUpdate={onUpdate} />} />
          <Route path="posts/new" element={<PostNew onCreate={onCreate} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
