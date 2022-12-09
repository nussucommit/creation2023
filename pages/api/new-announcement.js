import { MongoClient } from 'mongodb';

async function addAnnouncementAPI(req, res) {
  if (req.method === 'POST') {
    const data = req.body;
    const mongoUsername = process.env.MONGODB_USERNAME;
    const mongoPassword = process.env.MONGODB_PASSWORD;
    const mongoCredential = `${mongoUsername}:${mongoPassword}`;
    const mongoConnectionString = `mongodb+srv://${mongoCredential}@creation2023.5inbmto.mongodb.net/announcements?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db();

    const announcementCollection = db.collection('announcements');

    await announcementCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: 'Announcement added!' });
  }
}

export default addAnnouncementAPI;
