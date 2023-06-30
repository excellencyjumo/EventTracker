const express = require('express');
const authenticate = require('../middlewares/auth');
const eventController = require('../controllers/event');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '../uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set the file name for uploaded files
  }
});

const upload = multer({ storage });

const router = express.Router();

router.post('/events', authenticate, upload.single('image'), eventController.createEvent);
router.post('/events/:eventId/attend', authenticate, eventController.attendEvent);
router.get('/events/:id', authenticate, eventController.getEventById);
router.get('/events', authenticate, eventController.getLatestEvents);
router.put('/events/:id', authenticate, eventController.updateEvent);
router.delete('/events/:id', authenticate, eventController.deleteEvent);

module.exports = router;
