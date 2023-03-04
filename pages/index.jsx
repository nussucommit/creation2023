import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { kavoon } from '../helper/font-loader';
import PageContainer from '../components/layout/PageContainer';
import HomePageData from './home-page-data.json';
import HeroImage from '../public/home-logo.png';
import ChallengeDecoration from '../public/decorations/paperplane_white.png';
import TimelineDecoration from '../public/decorations/plants_orange.png';
import styles from '../styles/HomePage.module.scss';

function HomePage() {
  return (
    <>
      <Head>
        <title>Home - CREATION 2023 | NUSSU commIT</title>
        <link
          rel="canonical"
          href="https://creation2023.nussucommit.com"
          key="canonical"
        />
        <meta
          name="description"
          content="CREATION is one of NUSSU commIT's annual flagship events, a digital design competition open to all NUS students. CREATION hopes to provide a platform for NUS students to pursue their artistic passion and foster their design skills by tackling real-world problem statements."
          key="description"
        />
        <meta
          name="google-site-verification"
          content="yay-9avF-XbUHf7oHnLDS-iQclGt4xV4dUUdNtS6la4"
        />
      </Head>
      <PageContainer
        sectionContents={[
          // Hero section
          <div key="hero" className={styles['content-container']}>
            <Image id={styles['hero-image']} src={HeroImage} alt="hero image" />
          </div>,

          // Overview of Challenges section
          <div key="challenge-overview" className={styles['content-container']}>
            <div className={styles['title-container']}>
              <h1 className={kavoon.className}>Overview of Challenges</h1>
              <Image
                id={styles['challenge-overview-decoration']}
                src={ChallengeDecoration}
                alt="white paper plane"
              />
            </div>

            {HomePageData['challenge-overview'].map((challenge, index) => (
              <div
                key={challenge.title}
                className={styles['challenge-overview-item']}
              >
                <h1>
                  #
                  {index + 1}
                </h1>
                <h3>{challenge.title}</h3>
                <hr />
                <p>{challenge.description}</p>
                <Link href={challenge.link}>Learn more...</Link>
              </div>
            ))}
          </div>,

          // Competition Timeline section
          <div
            key="competition-timeline"
            className={styles['content-container']}
          >
            <h1 className={kavoon.className}>Competition Timeline</h1>
            {HomePageData['competition-timeline'].map((timeline) => (
              <div
                key={timeline.date}
                className={styles['competition-timeline-item']}
              >
                <h3>
                  {/* Date is emphasized text, slightly larger than $text-md size */}
                  <strong style={{ fontSize: '35px' }}>
                    {timeline.date}
                  </strong>
                </h3>
                <hr />
                {timeline.title.length > 0 && (
                  <h4>{timeline.title}</h4>
                )}
              </div>
            ))}
            <Image
              id={styles['competition-timeline-decoration']}
              src={TimelineDecoration}
              alt="orange plants"
            />
          </div>,

          // Prizes section
          <div key="prizes" className={styles['content-container']}>
            <h1 className={kavoon.className}>Prizes</h1>
            {HomePageData.prizes.map((prize) => (
              <div key={prize.rank} className={styles['prize-item']}>
                <img src={prize.imageURL} alt="Prize item" height={300} className={styles['prize-img']} />
                <h2>{prize.rank}</h2>
                <h3>{prize.name}</h3>
              </div>
            ))}
          </div>,

          // Partners and Sponsors section
          <div
            key="partners and sponsors"
            className={styles['content-container']}
          >
            <h1 className={kavoon.className}>Partners</h1>
            <h2>
              <i>Challenge Partners</i>
            </h2>
            {HomePageData.partners['Challenge Partners'].map((partner) => (
              <Image
                key={partner.id}
                className={styles['partner-item']}
                src={partner.imageURL}
                width={partner.imageHeight}
                height={partner.imageWidth}
                alt="Partner logo"
              />
            ))}
            <h1 className={kavoon.className}>Sponsors</h1>
            {HomePageData.sponsors.map((sponsor) => (
              <Image
                key={sponsor.id}
                className={styles['sponsor-item']}
                src={sponsor.imageURL}
                width={sponsor.imageWidth}
                height={sponsor.imageHeight}
                alt="Sponsor logo"
              />
            ))}
          </div>,
        ]}
      />
    </>
  );
}

export default HomePage;
