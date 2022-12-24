import PageContainer from '../components/layout/PageContainer';
import HomePageData from './home-page-data.json';
import styles from '../styles/HomePage.module.scss';

function HomePage() {
  return (
    <PageContainer
      sectionContents={[
        <div key="hero">
          <h1>CREATION 2023</h1>
        </div>,
        <div key="challenge-overview" className={styles['content-container']}>
          <h1>Overview of Challenges</h1>
          {HomePageData['challenge-overview'].map((challenge) => (
            <div
              key={challenge.title}
              className={styles['challenge-overview-item']}
            >
              <h3>{challenge.title}</h3>
              <hr />
              <p>{challenge.description}</p>
              <a href={challenge.link}>Learn more...</a>
            </div>
          ))}
        </div>,
        <div key="competition-timeline" className={styles['content-container']}>
          <h1>Competition Timeline</h1>
          {HomePageData['competition-timeline'].map((timeline) => (
            <div
              key={timeline.date}
              className={styles['competition-timeline-item']}
            >
              <h3>
                {/* Date is emphasized text, slightly larger than $text-md size */}
                <strong style={{ fontSize: '35px' }}>
                  {timeline.date}
                  :
                </strong>
                {' '}
                <span>{timeline.title}</span>
              </h3>
              <hr />
              <p>{timeline.description}</p>
            </div>
          ))}
        </div>,
        <div key="prizes">
          <h1>Prizes</h1>
        </div>,
        <div key="partners">
          <h1>Partners</h1>
        </div>,
        <div key="sponsors">
          <h1>Sponsors</h1>
        </div>,
      ]}
    />
  );
}

export default HomePage;
