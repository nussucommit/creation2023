import Link from 'next/link';

import styles from './NavBar.module.scss';

function NavBar() {
  return (
    <div className={styles.navbar}>
      <Link href="/">CREATION 2023</Link>
      <Link href="/announcements">Announcement</Link>
      <Link href="/challenges">Challenges</Link>
      <Link href="/submissions">Submission</Link>
      <Link href="/rules">Rules</Link>
      <Link href="/faq">FAQ</Link>
      <Link href="/contacts">Contact</Link>
    </div>
  );
}

export default NavBar;
