# README.md

# New Project

This project is a web application that manages events and users. It provides a RESTful API for creating, updating, retrieving, and deleting events and users.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Project Structure](#project-structure)
4. [API Endpoints](#api-endpoints)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)

## Introduction

This application allows users to manage events and user accounts. It is built using Node.js, Express, and PostgreSQL.

## Getting Started

To get started with this project, clone the repository and install the necessary dependencies:

```bash
npm install
```

You will also need to create the environment variable files `.env.development`, `.env.production`, and `.env.test` to configure your database connections.

## Project Structure

The project is organized into several key directories:

- `controllers`: Contains the logic for handling requests related to events and users.
- `models`: Contains the database models for events and users.
- `routes`: Defines the API endpoints for events and users.
- `db`: Contains database connection logic, setup scripts, and seed data.
- `config`: Contains configuration settings for different environments.
- `middleware`: Contains middleware for authentication.
- `__tests__`: Contains test files for the application.

## API Endpoints

The API provides the following endpoints:

- **Events**
  - `GET /api/events`: Retrieve all events.
  - `POST /api/events`: Create a new event.
  - `GET /api/events/:id`: Retrieve an event by ID.
  - `PATCH /api/events/:id`: Update an event by ID.
  - `DELETE /api/events/:id`: Delete an event by ID.

- **Users**
  - `GET /api/users`: Retrieve all users.
  - `POST /api/users`: Create a new user.
  - `GET /api/users/:id`: Retrieve a user by ID.
  - `PATCH /api/users/:id`: Update a user by ID.
  - `DELETE /api/users/:id`: Delete a user by ID.

## Environment Variables

The application uses environment variables to manage configuration settings. Create the following files in the root directory:

- `.env`: General environment variables.
- `.env.development`: Variables for the development environment.
- `.env.production`: Variables for the production environment.
- `.env.test`: Variables for the test environment.

## Running the Application

To run the application, use the following command:

```bash
npm start
```

The server will start and listen on the specified port.

## Testing

To run the tests, use the following command:

```bash
npm test
```

This will execute the test suite and provide feedback on the application functionality.