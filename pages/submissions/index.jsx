import Link from 'next/link';

import { kavoon } from '../../helper/font-loader';
import PageContainer from '../../components/layout/PageContainer';
import SUBMISSIONS from './submissions.json';
import styles from '../../styles/SubmissionPage.module.scss';

function SubmissionPage() {
  return (
    <PageContainer
      sectionContents={[
        <div className={styles['content-container']}>
          <h1 className={kavoon.className}>Submission</h1>
          {SUBMISSIONS.map((submission) => (
            <Link class={styles['submission-container']} href={submission.link}>
              <img src="submission-icon.svg" alt="submission icon" />
              <h3>{submission.title}</h3>
            </Link>
          ))}
        </div>,
      ]}
    />
  );
}

export default SubmissionPage;
