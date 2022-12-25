import Link from 'next/link';
import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import SubmissionIcon from '../../public/submission-icon.svg';
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
              <Image src={SubmissionIcon} alt="submission icon" />
              <h3>{submission.title}</h3>
            </Link>
          ))}
        </div>,
      ]}
    />
  );
}

export default SubmissionPage;
