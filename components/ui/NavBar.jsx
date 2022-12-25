import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, Fragment } from 'react';

import { kavoon } from '../../helper/font-loader';
import NAVBAR_LINKS, { CHALLENGE_LINKS } from '../../constants/navbarLinks';
import BREAKPOINTS from '../../constants/breakPoints';
import styles from './NavBar.module.scss';

function NavBar() {
  return (
    <div className={styles['nav-container']}>
      {/* Navigation bar for desktop view */}
      <TopNav />
      {/* Side navigation for mobile view */}
      <SideNav />
    </div>
  );
}

function TopNav() {
  const router = useRouter();
  const pathName = router.pathname;

  return (
    <div className={styles.topnav}>
      <Link href="/">
        <span className={kavoon.className}>CREATION 2023</span>
      </Link>
      {NAVBAR_LINKS.map((link) => {
        const isCurrentPage = pathName.includes(link.path);

        if (link.path === '/challenges') {
          return (
            <div key={link.path} className={styles.dropdown}>
              <Link
                className={isCurrentPage ? styles['link-current'] : ''}
                href={link.path}
              >
                {link.title}
              </Link>

              <div className={styles['dropdown-content']}>
                {/* List links for all challenges */}
                {CHALLENGE_LINKS.map((challengeLink) => (
                  <Link key={challengeLink.path} href={challengeLink.path}>
                    {challengeLink.title}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link
            key={link.path}
            className={isCurrentPage ? styles['link-current'] : ''}
            href={link.path}
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
}

function SideNav() {
  const [sidenavWidth, setSidenavWidth] = useState('0%');

  const toggleSidenav = () => {
    const openWidth = window.innerWidth > BREAKPOINTS.sm ? '50%' : '100%';
    setSidenavWidth((prevWidth) => (prevWidth === '0%' ? openWidth : '0%'));
  };

  return (
    <>
      {/* Hamburger menu */}
      <button
        className={styles['sidenav-menu']}
        onClick={toggleSidenav}
        type="button"
      >
        &#9776;
      </button>

      <div className={styles.sidenav} style={{ width: sidenavWidth }}>
        {/* Close button */}
        <button onClick={toggleSidenav} type="button">
          &times;
        </button>

        {NAVBAR_LINKS.map((link) => (
          <Fragment key={link.path}>
            <Link href={link.path} onClick={toggleSidenav}>
              {link.title}
            </Link>

            {link.path === '/challenges' && (
              <ul>
                {/* List links for all challenges */}
                {CHALLENGE_LINKS.map((challengeLink) => (
                  <Link
                    key={challengeLink.path}
                    href={challengeLink.path}
                    onClick={toggleSidenav}
                  >
                    {challengeLink.title}
                  </Link>
                ))}
              </ul>
            )}
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default NavBar;
