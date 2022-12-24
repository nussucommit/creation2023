import { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import storage from '../../firebase/firebase-config';
import allowedImageTypes from '../../constants/allowedImageTypes';
import allowedVideoTypes from '../../constants/allowedVideoTypes';

function EditAnnouncementForm({
  announcementData,
  onEditAnnouncement,
  onCancelEdit,
}) {
  const titleInputRef = useRef(announcementData.title);
  const descriptionInputRef = useRef(announcementData.description);
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

    const updatedAnnouncementData = {
      title: enteredTitle,
      description: enteredDescription,
      datetime: announcementData.datetime,
      mediaURL: announcementData.mediaURL,
      mediaType: announcementData.mediaType,
    };

    const mediaUploaded = !!mediaFile;

    if (mediaUploaded) {
      if (
        allowedImageTypes.includes(mediaFile.type)
        || allowedVideoTypes.includes(mediaFile.type)
      ) {
        updatedAnnouncementData.mediaType = mediaFile.type;
      } else {
        // eslint-disable-next-line no-alert
        alert('Please upload supported media types only!');
        return;
      }

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
              updatedAnnouncementData.mediaURL = mediaURL;

              await onEditAnnouncement(updatedAnnouncementData);
            })
            // eslint-disable-next-line no-alert
            .catch((error) => alert(error.message, 'error'));
        },
      );
    } else {
      await onEditAnnouncement(updatedAnnouncementData);
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
          defaultValue={announcementData.title}
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
          defaultValue={announcementData.description}
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
      {uploadProgress ? (
        <p>{uploadProgress}</p>
      ) : (
        <button type="submit">Update Announcement</button>
      )}

      <br />
      <br />
      <button type="button" onClick={onCancelEdit}>
        Cancel
      </button>
    </form>
  );
}

EditAnnouncementForm.propTypes = {
  announcementData: PropTypes.objectOf(PropTypes.string).isRequired,
  onEditAnnouncement: PropTypes.func.isRequired,
  onCancelEdit: PropTypes.func.isRequired,
};

export default EditAnnouncementForm;
