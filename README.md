# Chicken-Eeper API

The Chicken-Eeper API is a RESTful service built for managing the configuration of an automated chicken coop door system. The API allows you to:

- **Obtain OAuth 2.0 access tokens:** Secure your API endpoints using the password grant.
- **Update global configuration:** Set the opening hours, closing hours, and expected number of chickens.
- **Retrieve configuration:** Get the current configuration (or receive a default empty configuration if none has been set).

## Purpose

The purpose of this API is to help automated chicken coop door owners schedule and manage the opening and closing of their chicken coop doors. With this API, users can easily configure:
- The time the door should open (e.g., "06:00")
- The time the door should close (e.g., "20:00")
- The expected number of chickens inside the coop

This configuration can then be used by other parts of your system (e.g., a front-end interface or an IoT device) to control the door operation automatically.

## Technologies Used

- **Node.js & Restify:** For building a lightweight, performant HTTP API.
- **oauth2-server:** To implement OAuth 2.0 authentication.
- **Sequelize & MySQL2:** To manage and persist configuration data in a MySQL database.
- **Docker & Docker Compose:** To containerize the application and database for easy deployment and development.
- **Nodemon:** For auto-reloading during development.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/) installed on your machine.
- (Optional) [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) if you wish to run locally without Docker.

### Installation & Running with Docker

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yourusername/chicken-eeper-api.git
   cd chicken-eeper-api
   ```

2. **Configure Environment Variables (optional):**

   Create a `.env` file (if desired) to override default MySQL settings. Example:

   ```env
   MYSQL_HOST=mysql
   MYSQL_USER=root
   MYSQL_PASSWORD=password
   MYSQL_DATABASE=testdb
   PORT=3000
   ```

3. **Run the Project:**

   Use Docker Compose to build and run the containers:

   ```bash
   docker-compose up --build
   ```

   The API will be available at `http://localhost:3000`.

4. **Hot Reloading (Development):**

   If you make code changes, the container uses bind mounts along with Nodemon for auto-reloading. You may need to use the `--legacy-watch` flag depending on your environment.

### Running Locally without Docker

1. **Install Dependencies:**

   Make sure you have Node.js installed, then run:

   ```bash
   npm install
   ```

2. **Configure Database:**

   Ensure you have a MySQL instance running and update your environment variables accordingly in a `.env` file or directly in your environment.

3. **Start the Server:**

   For production:

   ```bash
   npm start
   ```

   For development (with auto-reloading):

   ```bash
   npm run dev
   ```

## API Endpoints

### OAuth Token Endpoint

- **POST** `/oauth/token`

  **Description:**  
  Issues an OAuth 2.0 access token using the password grant.

  **Request Body (JSON):**
  ```json
  {
    "grant_type": "password",
    "username": "admin",
    "password": "yourpassword",
    "client_id": "client",
    "client_secret": "secret"
  }
  ```

  **Response:**
  ```json
  {
    "access_token": "eyJ...",
    "token_type": "Bearer",
    "expires_in": 3600
  }
  ```

### Configuration Endpoints (Protected)

These endpoints require a valid Bearer token in the `Authorization` header.

#### Update Configuration

- **PUT** `/config`

  **Request Body (JSON):**
  ```json
  {
    "openingHours": "06:00",
    "closingHours": "20:00",
    "expectedChickenCount": 10
  }
  ```

  **Response:**  
  Returns the updated configuration object.

#### Retrieve Configuration

- **GET** `/config`

  **Response:**  
  Returns the current configuration, or an empty configuration if none exists:
  ```json
  {
    "openingHours": "",
    "closingHours": "",
    "expectedChickenCount": 0
  }
  ```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Contributions, suggestions, and feedback are welcome! Feel free to open issues or pull requests.

## Acknowledgments

- Built with [Restify](https://restify.com/), [Sequelize](https://sequelize.org/), and other awesome libraries.
- Inspired by the need for simple automation in smart farming.
