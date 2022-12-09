import { MongoClient } from 'mongodb';

async function addAnnouncementAPI(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const { enteredPassword, ...announcementData } = data;
    if (enteredPassword !== process.env.ADMIN_PASSWORD) {
      res.status(401).json({ success: false, message: 'Wrong password!' });
      return;
    }

    const mongoUsername = process.env.MONGODB_USERNAME;
    const mongoPassword = process.env.MONGODB_PASSWORD;
    const mongoCredential = `${mongoUsername}:${mongoPassword}`;
    const mongoConnectionString = `mongodb+srv://${mongoCredential}@creation2023.5inbmto.mongodb.net/announcements?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db();

    const announcementCollection = db.collection('announcements');

    await announcementCollection.insertOne(announcementData);

    client.close();

    res.status(201).json({ success: true, message: 'Announcement added!' });
  }
}

export default addAnnouncementAPI;
