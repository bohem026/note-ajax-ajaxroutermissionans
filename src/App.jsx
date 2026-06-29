import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';

function App() {
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout loaded={loaded} />}>
          <Route index element={<Home posts={posts} />} />
          {/* <Route path="posts" element={<Posts posts={posts} />} />
        <Route
          path="posts/:id"
          element={<PostDetail posts={} onDelete={}/>}
        />
        <Route path="*" element={<NotFound />}/> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
