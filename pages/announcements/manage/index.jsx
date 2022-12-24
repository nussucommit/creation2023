import { useRef, useState } from 'react';

import { MongoClient } from 'mongodb';
import PropTypes from 'prop-types';

import PageContainer from '../../../components/layout/PageContainer';
import AnnouncementPage from '..';
import monthNames from '../../../constants/monthNames';

function AnnouncementManagementPage({ announcements }) {
  const passwordInputRef = useRef();
  const [authorized, setAuthorized] = useState(false);

  const authorizeHandler = async (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const response = await fetch(
      `/api/authorize?password=${encodeURIComponent(enteredPassword)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    // eslint-disable-next-line no-alert
    alert(data.message);

    setAuthorized(data.success);
  };

  return authorized ? (
    <AnnouncementPage isAuthorized={authorized} announcements={announcements} />
  ) : (
    <PageContainer
      sectionContents={[
        <form onSubmit={authorizeHandler}>
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
          <br />
          <br />
          <button type="submit">Manage announcement</button>
        </form>,
      ]}
    />
  );
}

AnnouncementManagementPage.propTypes = {
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

  const announcements = await announcementsCollection.find().sort({ datetime: -1 }).toArray();

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

export default AnnouncementManagementPage;
