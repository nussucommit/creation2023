import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import ContactDecoration from '../../public/decorations/friends_orange.png';
import PageContainer from '../../components/layout/PageContainer';
import styles from '../../styles/ContactPage.module.scss';

function ContactPage() {
  return (
    <PageContainer
      sectionContents={[
        <div className={styles['contact-item']}>
          <h1 className={kavoon.className}>Contact Us</h1>
          <p>
            Please submit your inquiry to
            {' '}
            <a
              href="mailto: creation@nussucommit.com"
              style={{ textDecoration: 'underline' }}
            >
              creation@nussucommit.com
            </a>
            .
            {' '}
            <br />
            Thank you :)
          </p>
          <Image
            id={styles['contact-decoration']}
            src={ContactDecoration}
            alt="orange friends"
          />
        </div>,
      ]}
    />
  );
}

export default ContactPage;
