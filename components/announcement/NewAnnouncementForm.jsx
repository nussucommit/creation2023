import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import storage from '../../firebase/firebase-config';

function NewAnnouncementForm({ onAddAnnouncement }) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const passwordInputRef = useRef();
  const [mediaFile, setMediaFile] = useState();

  const uploadHandler = (event) => {
    event.preventDefault();
    setMediaFile(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    // Check admin password
    const enteredPassword = passwordInputRef.current.value;
    if (enteredPassword !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // eslint-disable-next-line no-alert
      alert('Wrong Password!');
      return;
    }

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const currentDatetime = new Date();
    const currentDatetimeString = `${currentDatetime.getDate()}/${
      currentDatetime.getMonth() + 1
    }/${currentDatetime.getFullYear()} ${currentDatetime.getHours()}:${currentDatetime.getMinutes()}:${currentDatetime.getSeconds()}`;

    const announcementData = {
      title: enteredTitle,
      description: enteredDescription,
      datetime: currentDatetimeString,
      mediaURL: '',
    };

    const mediaUploaded = !!mediaFile;
    if (mediaUploaded) {
      const modifiedMediaName = `announcement_${Date.now()}`;
      const mediaStorageLocation = `announcements/${modifiedMediaName}`;
      const mediaStorageRef = ref(storage, mediaStorageLocation);
      await uploadBytes(mediaStorageRef, mediaFile);
      getDownloadURL(mediaStorageRef)
        .then(async (mediaURL) => {
          announcementData[mediaURL] = mediaURL;

          await onAddAnnouncement(announcementData);
        })
        // eslint-disable-next-line no-alert
        .catch((error) => alert(error.message, 'error'));
    } else {
      await onAddAnnouncement(announcementData);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="announcement-title">
        Title:
        <br />
        <textarea
          id="announcement-title"
          name="announcement title"
          ref={titleInputRef}
          required
        />
      </label>

      <hr />
      <label htmlFor="announcement-description">
        Description:
        <br />
        <textarea
          id="announcement-description"
          name="announcement description"
          ref={descriptionInputRef}
          required
        />
      </label>

      <hr />
      <label htmlFor="announcement-media">
        Media (image/video):
        <br />
        <input
          id="announcement-media"
          type="file"
          accept="image/*,video/*"
          onChange={uploadHandler}
        />
      </label>
      <br />

      <hr />
      <label htmlFor="admin-password">
        Admin Password:
        <br />
        <input
          id="admin-password"
          type="password"
          ref={passwordInputRef}
          required
        />
      </label>

      <hr />
      <button type="submit">Add Announcement</button>
    </form>
  );
}

NewAnnouncementForm.propTypes = {
  onAddAnnouncement: PropTypes.func.isRequired,
};

export default NewAnnouncementForm;
