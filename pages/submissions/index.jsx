import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import SubmissionIcon from '../../public/submission-icon.svg';
import PageContainer from '../../components/layout/PageContainer';
import SUBMISSIONS from './submissions.json';
import styles from '../../styles/SubmissionPage.module.scss';

function SubmissionPage() {
  return (
    <>
      <Head>
        <title>Submission - CREATION 2023 | NUSSU commIT</title>
        <link
          rel="canonical"
          href="https://creation2023.nussucommit.com/submissions"
          key="canonical"
        />
        <meta
          name="description"
          content="Submit your masterpiece to win the prize!"
          key="description"
        />
      </Head>
      <PageContainer
        sectionContents={[
          <div className={styles['content-container']}>
            <h1 className={kavoon.className}>Submission</h1>
            {SUBMISSIONS.map((submission) => (
              <Link
                key={submission.title}
                className={styles['submission-container']}
                href={submission.link}
              >
                <Image src={SubmissionIcon} alt="submission icon" width="auto" />
                <h3>{submission.title}</h3>
              </Link>
            ))}
          </div>,
        ]}
      />
    </>
  );
}

export default SubmissionPage;
