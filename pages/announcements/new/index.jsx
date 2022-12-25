import { useRouter } from 'next/router';
import Head from 'next/head';

import PageContainer from '../../../components/layout/PageContainer';
import NewAnnouncementForm from '../../../components/announcement/NewAnnouncementForm';

function AnnouncementManager() {
  const router = useRouter();

  const addAnnouncementHandler = async (enteredAnnouncementData) => {
    const response = await fetch('/api/new-announcement', {
      method: 'POST',
      body: JSON.stringify(enteredAnnouncementData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // eslint-disable-next-line no-alert
    alert(data.message);

    if (data.success) {
      router.push('/announcements');
    }
  };

  return (
    <>
      <Head>
        <title>New Announcement - CREATION 2023 | NUSSU commIT</title>
        <meta name="google" content="nositelinkssearchbox" key="nositelinks" />
        <meta name="google" content="notranslate" key="notranslate" />
      </Head>
      <PageContainer
        sectionContents={[
          <NewAnnouncementForm onAddAnnouncement={addAnnouncementHandler} />,
        ]}
      />
    </>
  );
}

export default AnnouncementManager;
