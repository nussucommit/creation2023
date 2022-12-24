import PropTypes from 'prop-types';

import NavBar from '../ui/NavBar';
import styles from './SectionContainer.module.scss';

function SectionContainer({ sectionIndex, content }) {
  // Alternate the background color and text color of the section
  const sectionClass = sectionIndex % 2 === 0
    ? styles['primary-section']
    : styles['secondary-section'];

  return (
    <section
      className={`${styles['section-container']} ${sectionClass}`}
    >
      {sectionIndex === 0 && <NavBar />}
      {content}
    </section>
  );
}

SectionContainer.propTypes = {
  sectionIndex: PropTypes.number.isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node])
    .isRequired,
};

export default SectionContainer;
