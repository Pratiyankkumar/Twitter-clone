# Twitter Clone

This is a simplified version of Twitter built using the MongoDB, Express.js and Node.js. The goal of this project is to replicate key features of Twitter, including posting tweets, liking tweets, and managing profiles.

## Features

- **User Authentication**: Users can sign up, log in, and log out.
- **Create and Post Tweets**: Users can compose new tweets.
- **Like Tweets**: Users can like tweets.
- **User Profiles**: Users can view and edit their own profiles.
- **Responsive Design**: The UI is designed to work across different screen sizes.

## Tech Stack

- **Front-end**: Tailwind CSS
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Other Tools**: bcrypt for password hashing, dotenv for environment variables

## Setup

### Prerequisites

- Node.js installed
- MongoDB installed

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Pratiyankkumar/Twitter-clone.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Twitter-clone
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the `root` directory and add your MongoDB URI and JWT secret:

    ```plaintext
    MONGODB_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    PORT=port_number
    ```
    
6. Start the backend:

    ```bash
    npm run dev
    ```

8. Open your browser and go to `http://localhost:3000`.

