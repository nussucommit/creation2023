import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../ui/NavBar';
import BREAKPOINTS from '../../constants/breakPoints';
import styles from './SectionContainer.module.scss';

function SectionContainer({ sectionCount, sectionIndex, content }) {
  const [windowWidth, setWindowWidth] = useState(0);
  const heightRestrictClass = sectionCount > 1 && windowWidth > BREAKPOINTS.md
    ? styles['height-restrict']
    : '';

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setWindowWidth]);

  return (
    <div className={`${styles['section-container']} ${heightRestrictClass}`}>
      {sectionIndex === 0 && <NavBar />}
      {content}
    </div>
  );
}

SectionContainer.propTypes = {
  sectionCount: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node])
    .isRequired,
};

export default SectionContainer;
