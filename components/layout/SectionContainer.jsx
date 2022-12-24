import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import NavBar from '../ui/NavBar';
import BREAKPOINTS from '../../constants/breakPoints';
import styles from './SectionContainer.module.scss';

function SectionContainer({ sectionCount, sectionIndex, content }) {
  const [windowWidth, setWindowWidth] = useState(0);

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

  // If it is a homepage (more than 1 section) and large screen,
  // enable scroll snap align start and hide section container scroll bar
  const scrollClass = sectionCount > 1 && windowWidth > BREAKPOINTS.lg
    ? `${styles['snap-start']} ${styles['scrollbar-hide']}`
    : '';

  // Alternate the background color and text color of the section, except for last section
  const sectionClass = sectionIndex % 2 === 0 || sectionIndex === sectionCount - 1
    ? styles['primary-section']
    : styles['secondary-section'];

  return (
    <section
      className={`${styles['section-container']} ${scrollClass} ${sectionClass}`}
    >
      {sectionIndex === 0 && <NavBar />}
      {content}
    </section>
  );
}

SectionContainer.propTypes = {
  sectionCount: PropTypes.number.isRequired,
  sectionIndex: PropTypes.number.isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node])
    .isRequired,
};

export default SectionContainer;
