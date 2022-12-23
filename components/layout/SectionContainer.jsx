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

  // Set section container height and scrolling effect depending on whether it has one section only
  const singleSectionClass = sectionCount === 1 ? styles['height-content'] : '';
  const snapStartClass = sectionCount > 1 && windowWidth > BREAKPOINTS.lg
    ? styles['snap-start']
    : '';

  // Alternate the background color and text color of the section
  const sectionClass = sectionIndex % 2 === 0
    ? styles['primary-section']
    : styles['secondary-section'];

  return (
    <section
      className={`${styles['section-container']} ${singleSectionClass} ${snapStartClass} ${sectionClass}`}
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
