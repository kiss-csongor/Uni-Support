# Uni-Support Ticketing System

Uni-Support is a ticketing system built for managing support requests in a university environment. It provides a user-friendly interface for creating, tracking, and resolving tickets, aimed at enhancing communication between users and support teams.

## Features

- **Ticket Management**: Create, update, and resolve support tickets.
- **User Roles**: Admins, staff, and users with different access permissions.
- **Real-time Notifications**: Alerts on ticket updates.
- **Search & Filters**: Easily search tickets by status, priority, or category.
- **Frontend**: Built with React.js and styled with TailwindCSS.
- **Backend**: Django-based backend API for robust performance.
- **Docker**: Containerized setup for easy deployment.
- **CI/CD**: Automated pipelines with Jenkins.

## Technologies

- **Frontend**: React.js, TailwindCSS, JavaScript
- **Backend**: Django (Python)
- **Database**: SQLite (default) for development and PostgreSQL for production
- **Containerization**: Docker, Nginx (for reverse proxy)
- **CI/CD**: Jenkins
- **Authentication**: JWT tokens for secure user login

## Setup

### Prerequisites

Before starting, ensure you have the following installed on your system:

- Docker
- Node.js (for frontend)
- Python (for backend)
- PostgreSQL (for production)

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kiss-csongor/Uni-Support.git
    cd Uni-Support
    ```

2. **Install frontend dependencies**:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

3. **Setup backend**:
    - **Create `.env` file** in the `backend` directory and define necessary environment variables (like `DATABASE_URL`, `SECRET_KEY`, etc.). In development, SQLite is used by default; for production, set the `DATABASE_URL` to point to a PostgreSQL database.
    - Install backend dependencies:
      ```bash
      cd backend
      pip install -r requirements.txt
      ```
    - **Run the Django server**:
      ```bash
      python manage.py runserver
      ```

4. **Start the services** using Docker Compose (if you're using Docker):
    ```bash
    docker-compose up --build
    ```

5. **Database setup**: In development, SQLite will be used automatically. For production, configure PostgreSQL and run migrations:
    ```bash
    python manage.py migrate
    ```

6. **Access the application**:
    - **Frontend**: `http://localhost:3000`
    - **Backend**: `http://localhost:8000`

## Usage

- **Ticket Creation**: Users can create tickets by entering an issue description and setting priority.
- **Ticket Dashboard**: Admins and support staff can manage and resolve tickets.
- **Notifications**: Users receive notifications for ticket updates.

## CI/CD

This project uses **Jenkins** for continuous integration and delivery. The Jenkins configuration file can be found in the repository under `/Jenkinsfile`. This file defines the steps for building, testing, and deploying the application.

For more details on how Jenkins is configured, refer to the [Jenkinsfile](./Jenkinsfile).

## Containerization

The application is containerized using **Docker** for easy deployment. The `docker-compose.yml` file is located in the root of the repository and orchestrates the services for both the frontend and backend, along with the necessary dependencies like the database.

To build and run the containers, use the following command:
```bash
docker-compose up --build
