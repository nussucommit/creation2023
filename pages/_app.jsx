import PropTypes from 'prop-types';

import PageContainer from '../components/layout/PageContainer';
import NavBar from '../components/ui/NavBar';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
