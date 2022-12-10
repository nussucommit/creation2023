import PropTypes from 'prop-types';

function AnnouncementItem({ announcementData, isEditable }) {
  const hasMedia = !!announcementData.mediaURL;
  const mediaType = hasMedia && announcementData.mediaType.split('/')[0];
  const isImage = hasMedia && mediaType === 'image';
  const isVideo = hasMedia && mediaType === 'video';

  return (
    <>
      <h1>
        <li>{announcementData.title}</li>
      </h1>
      {isEditable && (
        <>
          <button type="button">Edit</button>
          <button type="button">Delete</button>
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
