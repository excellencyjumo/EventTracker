const connectDB = require('../config/db');

class Event {
  constructor(data) {
    this.uid = data.uid;
    this.name = data.name;
    this.tagline = data.tagline;
    this.schedule = new Date(data.schedule);
    this.description = data.description;
    this.files = { image: data.files.image };
    this.moderator = data.moderator;
    this.category = data.category;
    this.sub_category = data.sub_category;
    this.rigor_rank = data.rigor_rank;
    this.attendees = [];
  }

  static async findById(eventId) {
    const db = connectDB();
    return db.collection('events').findOne({ _id: eventId });
  }

  static async findLatest(limit, page) {
    const db = connectDB();
    const skip = (page - 1) * limit;
    return db
      .collection('events')
      .find()
      .sort({ schedule: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();
  }
  attendEvent(userId) {
    if (!this.attendees.includes(userId)) {
      this.attendees.push(userId);
    }
  }
  async save() {
    const db = connectDB();
    const result = await db.collection('events').insertOne(this);
    this._id = result.insertedId;
  }

  async update(updatedData) {
    const db = connectDB();
    await db.collection('events').updateOne({ _id: this._id }, { $set: updatedData });
  }

  async delete() {
    const db = connectDB();
    await db.collection('events').deleteOne({ _id: this._id });
  }
}

module.exports = Event;
