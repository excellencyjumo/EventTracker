# EventTracker

EventTracker is an API for managing events. It allows users to create, update, and delete events, as well as join events as attendees. The API is built using Node.js, Express.js, and MongoDB.

## Features

- Create a new event by providing event details such as name, tagline, schedule, description, moderator, category, sub-category, and rigor rank.
- Upload an image file as the event cover.
- Get an event by its unique ID.
- Get the latest events with pagination support.
- Update an existing event with new data.
- Delete an event by its ID.
- Join an event as an attendee.

## Prerequisites

- Node.js and npm installed on your machine
- MongoDB database

## Installation

1. Clone the repository:

git clone https://github.com/your-username/EventTracker.git

2. Navigate to the project directory:

cd EventTracker

3. Install the dependencies:

npm install package.json


4. Set up the environment variables:

Create a `.env` file in the root directory and add the following variables:

DATABASE_URL=mongodb://localhost:27017

DATABASE_NAME=eventtracker

SECRET_KEY=your-secret-key



Make sure to replace the values with your own MongoDB connection URL, database name, and a secret key for authentication.

## Usage

1. Start the server:

npm run start

2. Access the API endpoints using a tool like Postman or curl.

### API Endpoints

- `GET /api/v3/app/events?id=:event_id` - Get an event by its unique ID.
- `GET /api/v3/app/events?type=latest&limit=5&page=1` - Get the latest events with pagination support.
- `POST /api/v3/app/events` - Create a new event.
- `PUT /api/v3/app/events/:id` - Update an existing event.
- `DELETE /api/v3/app/events/:id` - Delete an event by its ID.
- `POST /api/v3/app/events/:eventId/attend` - Join an event as an attendee.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).