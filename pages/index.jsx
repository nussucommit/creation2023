import Link from 'next/link';

import PageContainer from '../components/layout/PageContainer';
import HomePageData from './home-page-data.json';
import styles from '../styles/HomePage.module.scss';

function HomePage() {
  return (
    <PageContainer
      sectionContents={[
        <div key="hero" className={styles['content-container']}>
          <img src="/home-logo.png" alt="logo" width="70%" />
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
              <Link href={challenge.link}>Learn more...</Link>
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
        <div key="prizes" className={styles['content-container']}>
          <h1>Prizes</h1>
          {HomePageData.prizes.map((prize) => (
            <div key={prize.rank} className={styles['prize-item']}>
              <img src="image-template.svg" alt="Prize item" width="100%" />
              <h3>{prize.rank}</h3>
              <p>{prize.name}</p>
            </div>
          ))}
          <div className={styles['prize-item']}>
            <h3>CV Collection</h3>
            <img src="image-template.svg" alt="CV item" width="25%" />
          </div>
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
