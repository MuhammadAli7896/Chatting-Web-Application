# Chat Nest - Chatting Web Application

Welcome to Chat Nest - your go-to platform for seamless real-time communication and media sharing!

## About

<a href="https://chat-nest-zcoa.onrender.com/" target="_blank">Chat Nest</a>
 is a modern chatting application built using the MERN stack (MongoDB, Express.js, React, Node.js) along with Socket.IO for real-time capabilities. It offers end-to-end encryption, robust authentication via Google and Facebook, and effortless media sharing through Cloudinary.

## Tech Stack

- **Frontend**: React for UI development.
- **Backend**: Node.js with Express.js for scalable server-side scripting.
- **UI Enhancement**: Chakra UI for improved aesthetics and responsiveness.
- **Database**: MongoDB with Mongoose.js for flexible and scalable data management.
- **Real-time Communication**: Socket.io for seamless chatting and data transfer.
- **Image Sharing**: Cloudinary for storage, optimization, and media sharing.
- **Hosting**: Render for simplified deployment and scaling of the web application.

## Features

- **Real-Time Communication**: Engage in lively conversations with friends and colleagues in real-time, thanks to Socket.IO's efficient event-driven architecture.

- **Create Groups**: Users can create groups to bring together friends, family, or colleagues, facilitating organized and efficient communication within specific contexts.
  
- **Effortless Media Sharing**: Share images seamlessly with Cloudinary's advanced image management system, enhancing your conversations with visual content.

- **Enhanced UI with Chakra UI**: Utilizing Chakra UI, Chat Nest offers a sleek and modern user interface, elevating the visual appeal and usability of the application.

- **Secure & Private**: Your privacy is our priority. With end-to-end encryption and authentication mechanisms from Google and Facebook, Chat Nest ensures secure interactions.
  
- **Lightning-Fast Frontend**: Powered by Vite.js, Chat Nest offers a lightning-fast and intuitive user interface, ensuring a smooth chatting experience.
  
- **Reliable Scalability**: Hosted on Render, Chat Nest guarantees reliability and scalability, providing uninterrupted connectivity regardless of the scale of interaction.

- **Forgot Password**: If a user forgets their password, they can easily reset it using the "Forgot Password" functionality, ensuring continued access to their account.

## How to use?

Simply, go to https://chat-nest-zcoa.onrender.com/ and sign up or you can login with your facebook and google accounts. Search for any user or your friend in search tab at top left corner, there you can find your friends and users. So you can create a chat by simply clicking on them.
Then you are ready to go. Enjoy chatting with your friends and family.

## Get Started

### Prerequisites

- Node.js and npm installed on your machine. To install node.js visit **https://nodejs.org/en/download**
- MongoDB database instance. To create mongodb instance visit **https://mongodb.com/atlas**

### Setting up Project 
To get Chat Nest up and running on your local machine, follow these simple steps:

### 1. Clone the Repository

Clone the Chat Nest repository to your local machine using the following command:

  ```git
  git clone https://github.com/MuhammadAli7896/Chatting-Web-Application.git
```
Make sure you have [git](https://git-scm.com/downloads) installed on your device.

### 2. Install Dependencies

Navigate to the root directory of the project and install the necessary dependencies by running:

```bash
npm install 
```
### 3. Install Frontend Dependencies

Navigate to the `frontend` directory of the project:

```bash
cd frontend
```

Then, install the frontend dependencies by running:

```bash
npm install --force
```

And, then navigate back to root directory:

```bash
cd..
```

### 4. Configure environment variables 

Create a `.env` file in the root directory and add the following environment variables:
```env
MONGO_URI = 
JWT_SECRET = 
EMAIL_USER = 
EMAIL_PASSWORD =  
EMAIL_HOST = 
EMAIL_ADDRESS = 
EMAIL_PORT = 587
MAX_LIMIT = 
MIN_LIMIT = 
clientID = 
clientSecret = 
IV = 
KEY = 
NODE_ENV = production
```

### 5. Start the Application

Start the Chat Nest application by running:

```bash
npm start
```

This will start backend server at **http://localhost:5000**.

Now, go to frontend directory:

```bash
cd frontend
```

Now start the development server of frontend:

```bash
npm run dev
```

This will start your development server and you can view it at **http://localhost:5173** .

Since I have used vite.js for this application frontend, so I run this command. If you are are using npx create-react-app command to create app, you have to run:

```bash
npm start
```

This will start your development server and you can view it at **http://localhost:3000**.

#### That's it you are now ready to use and develop this chatting application.

## Deployment

The application can be deployed to the [Render](https://render.com) hosting platform following these steps:

1. Create an account on [Render](https://dashboard.render.com/register) and set up your project.
2. Connect your GitHub repository to your Render project.
3. Configure environment variables in Render similar to the local setup.
4. Render will automatically build and deploy your application whenever changes are pushed to the connected GitHub repository.
5. For detailed deployment instructions, refer to the Render documentation.
   
### Contact

#### LinkedIn: https://www.linkedin.com/in/muhammad-ali-a772a025b/
#### Portfolio: https://muhammad-aliportfolio.netlify.app/
<br />
