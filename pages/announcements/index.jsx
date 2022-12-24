import { MongoClient } from 'mongodb';
import PropTypes from 'prop-types';

import PageContainer from '../../components/layout/PageContainer';
import AnnouncementItem from '../../components/announcement/AnnouncementItem';

function AnnouncementPage({ isAuthorized, announcements }) {
  const hasAnnouncement = announcements.length !== 0;
  if (hasAnnouncement) {
    announcements.reverse();
  }

  return (
    <PageContainer
      sectionContents={[
        <div>
          <h1>Announcements</h1>
          {hasAnnouncement
            && announcements.map((announcementData) => (
              <AnnouncementItem
                key={announcementData.id}
                announcementData={announcementData}
                isEditable={isAuthorized}
              />
            ))}
          {!hasAnnouncement && <p>No announcement at the moment...</p>}
        </div>,
      ]}
    />
  );
}

AnnouncementPage.defaultProps = {
  isAuthorized: false,
};

AnnouncementPage.propTypes = {
  isAuthorized: PropTypes.bool,
  announcements: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string))
    .isRequired,
};

export async function getStaticProps() {
  const mongoUsername = process.env.MONGODB_USERNAME;
  const mongoPassword = process.env.MONGODB_PASSWORD;
  const mongoCredential = `${mongoUsername}:${mongoPassword}`;
  const mongoConnectionString = `mongodb+srv://${mongoCredential}@creation2023.5inbmto.mongodb.net/announcements?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(mongoConnectionString);
  const db = client.db();

  const announcementsCollection = db.collection('announcements');

  const announcements = await announcementsCollection.find().toArray();

  client.close();

  return {
    props: {
      announcements: announcements.map((announcement) => {
        const description = announcement.description.replace(
          /(?:\r\n|\r|\n)/g,
          '<br />',
        );

        return {
          // eslint-disable-next-line no-underscore-dangle
          id: announcement._id.toString(),
          title: announcement.title,
          datetime: announcement.datetime,
          description,
          mediaURL: announcement.mediaURL,
          mediaType: announcement.mediaType,
        };
      }),
    },
    revalidate: 1,
  };
}

export default AnnouncementPage;
