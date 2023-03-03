import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import PageContainer from '../../components/layout/PageContainer';
import ChallengeDecoration from '../../public/decorations/paperplane_orange.png';
import CHALLENGES from './challenges.json';
import styles from '../../styles/ChallengePage.module.scss';

/* eslint-disable no-nested-ternary */
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
                <h2>
                  #
                  {challengeData.id}
                </h2>
                <h2>{challengeData.title}</h2>
                <hr />
                <h2>Overview</h2>
                {challengeData.overview.split('\n').map((e) => (
                  <p>{e}</p>
                ))}
                <h2>Background</h2>
                {challengeData.background.split('\n').map((paragraph) => (paragraph.includes('\t') ? (
                  <ul>
                    {paragraph.split('\t').map((item) => (
                      <li className={styles['challenge-p-tabbed']}>
                        <p>{item}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{paragraph}</p>
                )))}
                <h2>Requirements</h2>
                <ul>
                  {challengeData.requirements.split('\n').map((requirement) => (requirement.length > 0
                    ? requirement.includes('\t')
                      ? (requirement.split('\t').map((item) => item.length > 0 && (<li className={styles['challenge-p-tabbed']}><p>{item}</p></li>)))
                      : (<li key={requirement}><p>{requirement}</p></li>)
                    : (<br key={requirement} />)))}
                </ul>
                <h2>Prizes</h2>
                <ul>
                  {
                  challengeData.prizes.map((prize) => (
                    <li>
                      <p>
                        <strong>
                          {prize.place}
                          :
                          {' '}
                          {prize.name}
                        </strong>
                      </p>
                    </li>
                  ))
                }
                </ul>
              </div>
            </>,
          ]}
        />
      </>
    );
  }
}

export default ChallengeDetailPage;
