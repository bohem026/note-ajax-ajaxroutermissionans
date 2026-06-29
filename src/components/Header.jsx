import { NavLink, Link } from 'react-router';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>
        <Link to="/">Router Mission Blog</Link>
      </h1>
      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.open : undefined)}>
          Home
        </NavLink>
        <NavLink to="/posts" className={({ isActive }) => (isActive ? styles.open : undefined)}>
          Posts
        </NavLink>
        <NavLink to="/posts/new" className={({ isActive }) => (isActive ? styles.open : undefined)}>
          Write
        </NavLink>
      </nav>
    </header>
  );
}
