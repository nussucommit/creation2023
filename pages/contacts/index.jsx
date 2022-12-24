import PageContainer from '../../components/layout/PageContainer';
import styles from '../../styles/ContactPage.module.scss';

function ContactPage() {
  return (
    <PageContainer
      sectionContents={[
        <div className={styles['contact-item']}>
          <h1>Contact Us</h1>
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
          <img
            id={styles['contact-decoration']}
            src="/decorations/friends_orange.png"
            alt="orange friends"
          />
        </div>,
      ]}
    />
  );
}

export default ContactPage;
