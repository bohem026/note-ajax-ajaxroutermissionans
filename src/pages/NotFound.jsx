import { Link } from 'react-router';

export default function NotFound() {
  return (
    <>
      <h2>404 에러</h2>
      <p>페이지를 찾을수 없습니다.</p>
      <Link to="/">홈으로 이동</Link>
    </>
  );
}
