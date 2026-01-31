# FlavourVerse (Recipe Finder)

A full-stack MERN application that allows users to find, save, and manage recipes. This project is a complete web application with a React frontend and a Node.js/Express backend.

## Features

*   **User Authentication:** Secure user registration and login functionality.
*   **Browse Recipes:** View a collection of all available recipes.
*   **Recipe Details:** Click on a recipe to see detailed information, including ingredients and instructions.
*   **Add Recipes:** Authenticated users can add their own recipes, including an image upload.
*   **Edit & Delete:** Users can edit or delete the recipes they have created.
*   **My Recipes:** A dedicated section for users to view recipes they have personally added.
*   **Favorite Recipes:** Functionality to mark recipes as favorites and view them in a separate list.

## Tech Stack

### Frontend

*   **React:** A JavaScript library for building user interfaces.
*   **React Router:** For declarative routing in the React application.
*   **Axios:** A promise-based HTTP client for making requests to the backend.
*   **Vite:** A modern frontend build tool that significantly improves the development experience.

### Backend

*   **Node.js:** A JavaScript runtime built on Chrome's V8 JavaScript engine.
*   **Express:** A fast, unopinionated, minimalist web framework for Node.js.
*   **MongoDB:** A cross-platform document-oriented database program.
*   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
*   **JWT (JSON Web Tokens):** For securely transmitting information between parties as a JSON object, used for authentication.
*   **Multer:** A node.js middleware for handling `multipart/form-data`, used for file uploads.

## Installation and Setup

### Prerequisites

*   Node.js and npm (or yarn)
*   MongoDB instance (local or cloud-based)

### Backend Setup

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=8080
    MONGO_URL=<Your_MongoDB_Connection_String>
    JWT_SECRET=<Your_JWT_Secret>
    ```

4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server will be running on `http://localhost:8080`.

### Frontend Setup

1.  Navigate to the `frontend/flavourverse` directory:
    ```bash
    cd frontend/flavourverse
    ```

2.  Install the dependencies:
    ```bash
    npm install
    ```

3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The application will be running on `http://localhost:5173` (or another port if 5173 is in use).

## API Endpoints

### User Endpoints

*   `POST /signup`: Register a new user.
*   `POST /login`: Log in an existing user.
*   `GET /user/:id`: Get user details.

### Recipe Endpoints

*   `GET /recipe`: Get all recipes.
*   `GET /recipe/:id`: Get a single recipe by its ID.
*   `POST /recipe`: Add a new recipe (requires authentication).
*   `PUT /recipe/:id`: Update an existing recipe.
*   `DELETE /recipe/:id`: Delete a recipe (requires authentication).
