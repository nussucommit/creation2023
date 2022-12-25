import Head from 'next/head';
import Image from 'next/image';

import { kavoon } from '../../helper/font-loader';
import ContactDecoration from '../../public/decorations/friends_orange.png';
import PageContainer from '../../components/layout/PageContainer';
import styles from '../../styles/ContactPage.module.scss';

function ContactPage() {
  return (
    <>
      <Head>
        <title>Contact - CREATION 2023 | NUSSU commIT</title>
        <link
          rel="canonical"
          href="https://creation2023.nussucommit.com/contacts"
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
    </>
  );
}

export default ContactPage;
