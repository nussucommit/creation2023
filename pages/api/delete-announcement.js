import { MongoClient, ObjectId } from 'mongodb';

async function addAnnouncement(req, res) {
  if (req.method === 'DELETE') {
    const announcementID = req.query.id;

    const mongoUsername = process.env.MONGODB_USERNAME;
    const mongoPassword = process.env.MONGODB_PASSWORD;
    const mongoCredential = `${mongoUsername}:${mongoPassword}`;
    const mongoConnectionString = `mongodb+srv://${mongoCredential}@creation2023.5inbmto.mongodb.net/announcements?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(mongoConnectionString);
    const db = client.db();

    const announcementCollection = db.collection('announcements');

    await announcementCollection.deleteOne({ _id: ObjectId(announcementID) });

    client.close();

    res.status(201).json({ success: true, message: 'Announcement deleted!' });
  }
}

export default addAnnouncement;
