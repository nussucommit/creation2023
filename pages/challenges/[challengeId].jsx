import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import PageContainer from '../../components/layout/PageContainer';
import ChallengeDecoration from '../../public/decorations/paperplane_orange.png';
import CHALLENGES from './challenges.json';
import styles from '../../styles/ChallengePage.module.scss';

function ChallengeDetailPage() {
  const router = useRouter();

  const { challengeId } = router.query;
  const challengeIndex = +challengeId - 1;
  const challengeData = CHALLENGES[challengeIndex];

  if (challengeData) {
    return (
      <>
        <Head>
          <title>Challenge - CREATION 2023 | NUSSU commIT</title>
          <link
            rel="canonical"
            href={`https://creation2023.nussucommit.com/challenges/${challengeId}`}
            key="canonical"
          />
          <meta
            name="description"
            content="Pick your challenge statement in CREATION 2023!"
            key="description"
          />
        </Head>
        <PageContainer
          sectionContents={[
            <>
              <div className={styles['title-container']}>
                <h1 className={kavoon.className}>Challenges</h1>
                <Image
                  id={styles['challenge-decoration']}
                  src={ChallengeDecoration}
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
      </>
    );
  }
}

export default ChallengeDetailPage;
