import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import styles from './PostNew.module.css';

export default function PostEdit({ posts, onUpdate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = useParams();
  let navigate = useNavigate();

  const post = posts.find((p) => p.id === Number(id));

  useEffect(() => {
    if (!post) return;
    // eslint-disable-next-line
    setTitle(post.title);
    setContent(post.content);
  }, [post]);

  if (!post) {
    return (
      <>
        <h2>에러</h2>
        <p>존재하지 않는 게시물입니다.</p>
        <Link to="/">홈으로 이동</Link>
      </>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    console.log(title);
    console.log(content);

    onUpdate(Number(id), {
      title: title,
      content: content,
    });

    navigate(`/post/${id}`); // 현재 글 상세로 이동
  };

  return (
    <>
      <h2>글 작성</h2>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name=""
          id=""
          placeholder="내용"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        ></textarea>
        <button>등록</button>
      </form>
    </>
  );
}
