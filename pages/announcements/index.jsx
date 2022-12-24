import { MongoClient } from 'mongodb';
import PropTypes from 'prop-types';

import PageContainer from '../../components/layout/PageContainer';
import AnnouncementItem from '../../components/announcement/AnnouncementItem';
import monthNames from '../../constants/monthNames';

function AnnouncementPage({ isAuthorized, announcements }) {
  const hasAnnouncement = announcements.length !== 0;

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
          {!hasAnnouncement && (
            <p style={{ textAlign: 'center' }}>
              No announcement at the moment...
            </p>
          )}
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

  const announcements = await announcementsCollection
    .find()
    .sort({ datetime: -1 })
    .toArray();

  client.close();

  return {
    props: {
      announcements: announcements.map((announcement) => {
        const description = announcement.description.replace(
          /(?:\r\n|\r|\n)/g,
          '<br />',
        );

        const datetime = new Date(announcement.datetime);
        const day = datetime.getDate();
        const month = monthNames[datetime.getMonth()];
        let hour = datetime.getHours();
        let meridiemIndicator = 'AM';

        // Update meridiem indicator if necessary
        if (hour >= 12) {
          meridiemIndicator = 'PM';
        }

        // Convert to 12-hour clock format
        if (hour > 12) {
          hour -= 12;
        }

        if (hour === 0) {
          hour = 12;
        }

        const datetimeString = `${day} ${month} ${hour}:${datetime.getMinutes()} ${meridiemIndicator}`;

        return {
          // eslint-disable-next-line no-underscore-dangle
          id: announcement._id.toString(),
          title: announcement.title,
          datetime: datetimeString,
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
