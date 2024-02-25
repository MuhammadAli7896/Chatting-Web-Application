# Chat Nest - Chatting Web Application

Welcome to Chat Nest - your go-to platform for seamless real-time communication and media sharing!

## About

Chat Nest is a modern chatting application built using the MERN stack (MongoDB, Express.js, React, Node.js) along with Socket.IO for real-time capabilities. It offers end-to-end encryption, robust authentication via Google and Facebook, and effortless media sharing through Cloudinary.

## Features

- **Real-Time Communication**: Engage in lively conversations with friends and colleagues in real-time, thanks to Socket.IO's efficient event-driven architecture.

- **Create Groups**: Users can create groups to bring together friends, family, or colleagues, facilitating organized and efficient communication within specific contexts.
  
- **Effortless Media Sharing**: Share images seamlessly with Cloudinary's advanced image management system, enhancing your conversations with visual content.

- **Secure & Private**: Your privacy is our priority. With end-to-end encryption and authentication mechanisms from Google and Facebook, Chat Nest ensures secure interactions.
  
- **Lightning-Fast Frontend**: Powered by Vite.js, Chat Nest offers a lightning-fast and intuitive user interface, ensuring a smooth chatting experience.
  
- **Reliable Scalability**: Hosted on Render, Chat Nest guarantees reliability and scalability, providing uninterrupted connectivity regardless of the scale of interaction.

- **Forgot Password**: If a user forgets their password, they can easily reset it using the "Forgot Password" functionality, ensuring continued access to their account.

## How to use?

Simply, go to https://chat-nest-zcoa.onrender.com/ and sign up or you can login with your facebook and google accounts. Search for any user or your friend in search tab at top left corner, there you can find your friends and users. So you can create a chat by simply clicking on them.
Then you are ready to go. Enjoy chatting with your friends and family.

## Get Started

To get Chat Nest up and running on your local machine, follow these simple steps:

### 1. Clone the Repository

Clone the Chat Nest repository to your local machine using the following command:

#### git clone https://github.com/MuhammadAli7896/Chatting-Web-Application.git

Make sure you have git installed on your device.

### 2. Install Dependencies

Navigate to the root directory of the project and install the necessary dependencies by running:

#### npm install 

### 3. Install Frontend Dependencies

Navigate to the `frontend` directory of the project:

#### cd frontend

Then, install the frontend dependencies by running:

#### npm install --force

And, then navigate back to root directory:

#### cd..

### 4. Environment variables 

This application contains some environmental variables which are kept in private so you have to create and mention them separately in a .env file.

For example, for database connection the URL of the database is kept private because it contains all of the data of application and password for the database. You can setup your own database by visiting **https://mongodb.com**.

### 5. Start the Application

Start the Chat Nest application by running:

#### npm start

This will start backend server at **http://localhost:5000**.

Now, go to frontend directory:

#### cd frontend

Now start the development server of frontend:

#### npm run dev

This will start your development server and you can view it at **http://localhost:5173** .

Since I have used vite.js for this application frontend, so I run this command. If you are are using npx create-react-app command to create app, you have to run:

#### npm start

This will start your development server and you can view it at **http://localhost:3000**.

#### That's it you are now ready to use and develop this chatting application.
<br/>

#### Make sure you have installed and configured node.js on your device.
#### To install it, go to **https://nodejs.org/en/download**
