import { useRouter } from 'next/router';
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

  return <NewAnnouncementForm onAddAnnouncement={addAnnouncementHandler} />;
}

export default AnnouncementManager;
