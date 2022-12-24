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
        <div key="challenge-overview" className={styles['challenge-overview']}>
          <h1>Overview of Challenges</h1>
          {HomePageData['challenge-overview'].map((challenge) => (
            <div key={challenge.title}>
              <h3>{challenge.title}</h3>
              <hr />
              <p>{challenge.description}</p>
              <a href={challenge.link}>Learn more...</a>
            </div>
          ))}
        </div>,
        <div key="competition-timeline">
          <h1>Competition Timeline</h1>
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
