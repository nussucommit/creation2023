import { useRouter } from 'next/router';
import PageContainer from '../../components/layout/PageContainer';
import CHALLENGES from './challenges.json';
import styles from '../../styles/ChallengePage.module.scss';

function ChallengeDetailPage() {
  const router = useRouter();

  const { challengeId } = router.query;
  const challengeIndex = +challengeId - 1;
  const challengeData = CHALLENGES[challengeIndex];

  if (challengeData) {
    return (
      <PageContainer
        sectionContents={[
          <>
            <div className={styles['title-container']}>
              <h1>Challenges</h1>
              <img
                id={styles['challenge-decoration']}
                src="/decorations/paperplane_orange.png"
                alt="orange paper plane"
              />
            </div>
            <div className={styles['challenge-item']}>
              <h2>{challengeData.title}</h2>
              <hr />
              <p>{challengeData.description}</p>
            </div>
          </>,
        ]}
      />
    );
  }
}

export default ChallengeDetailPage;
