import { useParams, Link, useNavigate } from 'react-router';

export default function PostDetail({ posts, onDelete }) {
  const { id } = useParams();
  let navigate = useNavigate();

  console.log(id);
  const post = posts.find((p) => p.id === Number(id));
  if (!post) {
    return (
      <>
        <h2>에러</h2>
        <p>존재하지 않는 게시물입니다.</p>
        <Link to="/">홈으로 이동</Link>
      </>
    );
  }

  const handleDelete = () => {
    if (window.confirm('정말 삭제할까요?')) {
      onDelete(post.id);
      navigate('/posts');
    }
  };

  return (
    <>
      <h2>{post.title}</h2>
      <small>{post.createdAt}</small>
      <p>{post.content}</p>
      <div className="controls">
        <Link to={`/post/edit/${post.id}`}>수정하기</Link>
        <button onClick={handleDelete}>삭제하기</button>
      </div>
    </>
  );
}
