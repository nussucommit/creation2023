import PageContainer from '../../components/layout/PageContainer';

function ContactPage() {
  return (
    <PageContainer
      sectionContents={[
        <>
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
            . Thank you :)
          </p>
        </>,
      ]}
    />
  );
}

export default ContactPage;
