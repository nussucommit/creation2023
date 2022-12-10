import { useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { ref, deleteObject } from 'firebase/storage';

import EditAnnouncementForm from './EditAnnouncementForm';
import storage from '../../firebase/firebase-config';

function AnnouncementItem({ announcementData, isEditable }) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const hasMedia = !!announcementData.mediaURL;
  const mediaType = hasMedia && announcementData.mediaType.split('/')[0];
  const isImage = hasMedia && mediaType === 'image';
  const isVideo = hasMedia && mediaType === 'video';

  const deleteAnnouncementHandler = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `/api/delete-announcement?id=${encodeURIComponent(announcementData.id)}`,
      {
        method: 'DELETE',
      },
    );

    const data = await response.json();

    // eslint-disable-next-line no-alert
    alert(data.message);

    if (data.success) {
      const deleteRef = ref(storage, announcementData.mediaURL);
      deleteObject(deleteRef)
        .then(() => {
          router.push('/announcements');
        })
        .catch((error) => {
          // eslint-disable-next-line no-alert
          alert(error.message);
        });
    }
  };

  const updateAnnouncementHandler = async (updatedAnnouncementData) => {
    const response = await fetch(
      `/api/edit-announcement?id=${encodeURIComponent(announcementData.id)}`,
      {
        method: 'PUT',
        body: JSON.stringify(updatedAnnouncementData),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    // eslint-disable-next-line no-alert
    alert(data.message);

    if (data.success) {
      if (announcementData.mediaURL !== updatedAnnouncementData.mediaURL) {
        const deleteRef = ref(storage, announcementData.mediaURL);
        deleteObject(deleteRef)
          .then(() => {
            router.push('/announcements');
          })
          .catch((error) => {
            // eslint-disable-next-line no-alert
            alert(error.message);
          });
      } else {
        router.push('/announcements');
      }
    }
  };

  return isEditing ? (
    <EditAnnouncementForm
      announcementData={announcementData}
      onEditAnnouncement={updateAnnouncementHandler}
    />
  ) : (
    <>
      <h1>
        <li>{announcementData.title}</li>
      </h1>
      {isEditable && (
        <>
          <button type="button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button type="button" onClick={deleteAnnouncementHandler}>
            Delete
          </button>
        </>
      )}
      <p>{announcementData.datetime}</p>
      {hasMedia && isImage && (
        <img src={announcementData.mediaURL} alt="announcement media" />
      )}
      {hasMedia && isVideo && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <video width="100%" controls>
          <source src={announcementData.mediaURL} type="video/mp4" />
          <source src={announcementData.mediaURL} type="video/webm" />
          <source src={announcementData.mediaURL} type="video/ogg" />
          Your browser does not support HTML video.
        </video>
      )}
      <p>{announcementData.description}</p>
    </>
  );
}

AnnouncementItem.defaultProps = {
  isEditable: false,
};

AnnouncementItem.propTypes = {
  announcementData: PropTypes.objectOf(PropTypes.string).isRequired,
  isEditable: PropTypes.bool,
};

export default AnnouncementItem;
