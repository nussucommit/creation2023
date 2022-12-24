import Link from 'next/link';

import PageContainer from '../components/layout/PageContainer';
import HomePageData from './home-page-data.json';
import styles from '../styles/HomePage.module.scss';

function HomePage() {
  return (
    <PageContainer
      sectionContents={[
        // Hero section
        <div key="hero" className={styles['content-container']}>
          <img src="/home-logo.png" alt="logo" width="70%" />
        </div>,

        // Overview of Challenges section
        <div key="challenge-overview" className={styles['content-container']}>
          <div className={styles['title-container']}>
            <h1>Overview of Challenges</h1>
            <img
              id={styles['challenge-overview-decoration']}
              src="/decorations/paperplane_white.png"
              alt="white paper plane"
            />
          </div>

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

        // Competition Timeline section
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

        // Prizes section
        <div key="prizes" className={styles['content-container']}>
          <h1>Prizes</h1>
          {HomePageData.prizes.map((prize) => (
            <div key={prize.rank} className={styles['prize-item']}>
              <img src="image-template.svg" alt="Prize item" />
              <h3>{prize.rank}</h3>
              <p>{prize.name}</p>
            </div>
          ))}
          <div className={styles['prize-item']}>
            <img src="image-template.svg" alt="CV item" />
            <h3>CV Collection</h3>
          </div>
        </div>,

        // Partners and Sponsors section
        <div
          key="partners and sponsors"
          className={styles['content-container']}
        >
          <h1>Partners</h1>
          <h2>
            <i>Challenge Partners</i>
          </h2>
          {HomePageData.partners['Challenge Partners'].map((partner) => (
            <img
              key={partner.id}
              className={styles['partner-item']}
              src={partner.imageURL}
              alt="Partner logo"
            />
          ))}
          <h2>
            <i>Ecosystem Partners</i>
          </h2>
          {HomePageData.partners['Ecosystem Partners'].map((partner) => (
            <img
              key={partner.id}
              className={styles['partner-item']}
              src={partner.imageURL}
              alt="Partner logo"
            />
          ))}
          <h1>Sponsors</h1>
          {HomePageData.sponsors.map((sponsor) => (
            <img
              key={sponsor.id}
              className={styles['sponsor-item']}
              src={sponsor.imageURL}
              alt="Sponsor logo"
            />
          ))}
        </div>,
      ]}
    />
  );
}

export default HomePage;
