import PageContainer from '../components/layout/PageContainer';

function HomePage() {
  return (
    <PageContainer
      sectionContents={[
        <h1 key="hero">CREATION 2023</h1>,
        <h1 key="challenge-overview">Overview of Challenges</h1>,
        <h1 key="competition-timeline">Competition Timeline</h1>,
        <h1 key="prizes">Prizes</h1>,
        <h1 key="partners">Partners</h1>,
        <h1 key="sponsors">Sponsors</h1>,
      ]}
    />
  );
}

export default HomePage;
