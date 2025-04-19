# Social Network Web Application API

## License Badge
![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

## Description
This project is a backend API for a social network application where users can create thoughts, react to posts, and manage a friend list. The API is built using Express.js, MongoDB, and Mongoose, and supports full CRUD functionality for users and thoughts, as well as the ability to add/delete friends and reactions.

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
To get started, clone the repository to your local machine using the following command:
git clone https://github.com/meglanghoffdesign/social-network-api.git

Next, navigate into the project directory:
cd social-network-api

Install dependencies:
npm install

MongoDB must be running locally for this application to start. You can run MondoDB locally by entering the following in your terminal: 
mongod

After that, you can run the project with:
npm start

## Usage
Once the server is running, you can test the API routes in Insomnia or Postman.
The API supports the following functionality:
- Users: Create, Read, Update, Delete
- Thoughts: Create, Read, Update, Delete
- Reactions: Add/Delete reactions to thoughts
- Friends: Add/Delete friends to/from a user's friend list

Routes begin with /api and include:
- GET /api/users
- GET /api/users/userId
- POST /api/users
- PUT /api/users/userId
- DELETE /api/users/:userId
- POST /api/users/:userId/friends/:friendId
- DELETE /api/users/:userId/friends/:friendId
- GET /api/thoughts
- GET /api/thoughts/thoughtId
- POST /api/thoughts
- PUT /api/thoughts/thoughtId
- DELETE /api/thoughts/thoughtId
- POST /api/thoughts/:thoughtId/reactions
- DELETE /api/thoughts/:thoughtId/reactions/:reactionId

Additionally, here is walkthrough video: 
https://github.com/user-attachments/assets/530420b3-e7ed-4a73-a97d-4a69033e65f3

## Contributing
At this time, contributions to this project are not accepted. Please feel free to fork the repository for personal use or modifications. Any pull requests or issues will not be reviewed or merged.

## Tests
This project does not currently include automated testing. 

## Questions
If you have any questions, feel free to reach out to me at [meglanghoff@gmail.com](mailto:meglanghoff@gmail.com) or visit my GitHub profile at [https://github.com/meglanghoffdesign](https://github.com/meglanghoffdesign).
