# Send Meeting Reminder Using Twilio Call

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Run the Project](#run-the-project)
- [Project Structure](#project-structure)
- [Twilio Integration](#twilio-integration)

## Introduction

The Meeting Reminder Project is a web application designed to automate meeting reminders through outbound calls. It captures user input through DTMF tones, allowing users to confirm or decline attendance. Leveraging Twilio for call handling, the application uses Socket.IO to instantly notify the client about user attendance. In case of non-attendance, the call is forwarded to a manager, or a voicemail can be recorded.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Twilio Account](https://www.twilio.com/) with Account SID, Auth Token, and a Twilio phone number

## Getting Started

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Honey0908/Meeting-Reminder
   ```

2. **Navigate to the Project Directory:**

   ```bash
   cd Meeting-Reminder
   ```

3. **Install Dependencies:**

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

### Configuration

Before running the project, set up your environment variables:

1. **Create `.env` file in server Directory:**

   In the root of the `server` directory, create a `.env` file and add the following:

   ```env
   PORT=PORT_NUMBER
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_NUMBER=your_twilio_phone_number
   SERVER_URL=your_server_url
   ```

   Replace the placeholder values with your Twilio credentials and server URL.

2. **Create `.env` file in Client Directory:**

   In the root of the `client` directory, create a `.env` file and add the following:

   ```env
   VITE_SERVER_URL=your_server_url
   ```

   Replace the placeholder value with your server URL.

### Run the Project

Now, you're ready to run the Meeting Reminder Project:

1. **Start the Server:**

   ```bash
   cd server
   node index.js
   ```

2. **Start Ngrok for Local Development (Optional):**

   ```bash
   ngrok http 3000
   ```

   Use the Ngrok-provided URL as your public `SERVER_URL` for Twilio webhook configuration.

3. **Open a New Terminal and Start the Client:**
   ```bash
   cd client
   npm run dev
   ```

## Project Structure

```bash
├── client
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   ├── .env
│   ├── src
│   │   ├── app.css
│   │   ├── App.tsx
│   │   ├── components
│   │   │   └── MeetingForm.tsx
│   │   ├── main.tsx
│   │   ├── services
│   │   │   └── api.ts
│   │   └── vite-env.d.ts
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── readme.md
├── .gitignore
└── server
    ├── .env
    ├── config.js
    ├── index.js
    ├── package.json
    ├── package-lock.json
    └── src
        ├── handler.js
        └── router.js
```

## Twilio Integration

This project leverages Twilio for handling phone call interactions. Ensure that you have a Twilio account, and configure your Twilio Account SID, Auth Token, and Phone Number in the server's .env file.
