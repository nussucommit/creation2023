import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../firebase/firebase-config';
import allowedImageTypes from '../../constants/allowedImageTypes';
import allowedVideoTypes from '../../constants/allowedVideoTypes';
import monthNames from '../../constants/monthNames';

function NewAnnouncementForm({ onAddAnnouncement }) {
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();
  const passwordInputRef = useRef();
  const [mediaFile, setMediaFile] = useState();
  const [uploadProgress, setUploadProgress] = useState();

  const uploadHandler = (event) => {
    event.preventDefault();
    setMediaFile(event.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Generate date time string
    const currentDatetime = new Date();
    const currentDay = currentDatetime.getDate();
    const currentMonth = monthNames[currentDatetime.getMonth()];
    let currentHour = currentDatetime.getHours();
    let meridiemIndicator = 'AM';

    // Update meridiem indicator if necessary
    if (currentHour >= 12) {
      meridiemIndicator = 'PM';
    }

    // Convert to 12-hour clock format
    if (currentHour > 12) {
      currentHour -= 12;
    }

    if (currentHour === 0) {
      currentHour = 12;
    }

    const currentDatetimeString = `${currentDay} ${currentMonth} ${currentHour}:${currentDatetime.getMinutes()} ${meridiemIndicator}`;

    const announcementData = {
      title: enteredTitle,
      description: enteredDescription,
      datetime: currentDatetimeString,
      enteredPassword,
      mediaURL: '',
      mediaType: '',
    };

    const mediaUploaded = !!mediaFile;
    if (mediaUploaded) {
      if (
        allowedImageTypes.includes(mediaFile.type)
        || allowedVideoTypes.includes(mediaFile.type)
      ) {
        announcementData.mediaType = mediaFile.type;
      } else {
        // eslint-disable-next-line no-alert
        alert('Please upload supported media types only!');
        return;
      }
    }

    if (mediaUploaded) {
      const modifiedMediaName = `announcement_${Date.now()}`;
      const mediaStorageLocation = `announcements/${modifiedMediaName}`;
      const mediaStorageRef = ref(storage, mediaStorageLocation);
      const uploadTask = uploadBytesResumable(mediaStorageRef, mediaFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(`${progress}%`);
        },
        (error) => {
          // eslint-disable-next-line no-alert
          alert(error.message, 'error');
        },
        () => {
          getDownloadURL(mediaStorageRef)
            .then(async (mediaURL) => {
              announcementData.mediaURL = mediaURL;

              await onAddAnnouncement(announcementData);
            })
            // eslint-disable-next-line no-alert
            .catch((error) => alert(error.message, 'error'));
        },
      );
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
      {uploadProgress ? (
        <p>{uploadProgress}</p>
      ) : (
        <button type="submit">Add Announcement</button>
      )}
    </form>
  );
}

NewAnnouncementForm.propTypes = {
  onAddAnnouncement: PropTypes.func.isRequired,
};

export default NewAnnouncementForm;
