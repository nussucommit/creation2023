import PropTypes from 'prop-types';

import SectionContainer from './SectionContainer';
import styles from './PageContainer.module.scss';

function PageContainer({ sectionContents }) {
  const isHomePage = sectionContents.length > 1;

  return (
    <div
      className={`${styles['page-container']} ${
        isHomePage ? styles['overflow-scroll'] : ''
      }`}
    >
      {sectionContents.map((sectionContent, index) => (
        <SectionContainer
          key={sectionContent.key}
          sectionCount={sectionContents.length}
          sectionIndex={index}
          content={sectionContent}
        />
      ))}
    </div>
  );
}

PageContainer.propTypes = {
  sectionContents: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  ).isRequired,
};

export default PageContainer;
