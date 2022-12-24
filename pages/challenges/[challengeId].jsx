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
            <h1>Challenges</h1>
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
