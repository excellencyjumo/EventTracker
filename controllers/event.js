const Event = require('../models/Event');

async function createEvent(req, res, next) {
    const eventData = req.body;
    eventData.uid = req.userId;
    eventData.files = { image: req.file.path };
  
    try {
      const event = new Event(eventData);
      await event.save();
  
      res.status(201).json({ eventId: event._id });
    } catch (err) {
      next(err);
    }
  }

async function attendEvent (req, res, next) {
    try {
      const eventId = req.params.eventId;
      const userId = req.userId;
  
      // Fetch the event from the database
      const event = await Event.findById(eventId);
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      // Add user to the event attendees
      event.attendEvent(userId);
  
      // Save the updated event
      await event.save();
  
      res.json({ message: 'User has successfully joined the event', event });
    } catch (error) {
      next(error);
    }
  };

async function getEventById(req, res, next) {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        res.json(event);
    } catch (err) {
        next(err);
    }
}

async function getLatestEvents(req, res, next) {
    const { limit, page } = req.query;

    try {
        const events = await Event.findLatest(limit, page);
        res.json(events);
    } catch (err) {
        next(err);
    }
}


async function updateEvent(req, res, next) {
    const eventId = req.params.id;
    const eventData = req.body;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.update(eventData);
        res.json({ message: 'Event updated successfully' });
    } catch (err) {
        next(err);
    }
}

async function deleteEvent(req, res, next) {
    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }

        await event.delete();
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = { createEvent, attendEvent, getEventById, getLatestEvents, updateEvent, deleteEvent };
