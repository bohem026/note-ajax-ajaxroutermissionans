import { useState } from 'react';
import { useNavigate } from 'react-router';
import styles from './PostNew.module.css';

export default function PostNew({ onCreate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  let navigate = new useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      alert('제목과 내용을 모두 입력해주세요.');
      return;
    }

    const newId = onCreate({
      title: title,
      content: content,
    });

    navigate(`/post/${newId}`);
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
