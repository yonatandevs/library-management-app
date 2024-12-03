Library Management App
A library management system built using TypeScript, Express, and TypeORM with MySQL as the database. This guide provides instructions to set up and run the application.

Prerequisites
Make sure you have the following installed on your system:

Node.js (v16.x or higher)
npm (comes with Node.js)
MySQL (v8.x or higher)
Git (optional, for cloning the repository)
Setup Instructions

1. Clone the Repository
   git clone https://github.com/yonatandevs/library-management-app.git
   cd library-management-app
2. Install Dependencies
   Install the required packages:

npm install 3. Configure the Environment Variables
Create a .env file in the root directory of the project and configure the following variables:

env
NODE_ENV=development
PORT=3003
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=library_management
Replace your_password with your actual MySQL password.

4. Set Up the Database
   Create the database:
   Manually create the library database in MySQL or use the following command in your MySQL CLI:

sql
CREATE DATABASE library_management;
Run Migrations:
Generate the database schema by running migrations:

npm run migration:run 5. Build the Project
Compile the TypeScript code into JavaScript:

npm run build 6. Start the Server
Development Mode
To run the application in development mode with hot-reloading:
npm run dev
Production Mode
To run the application in production mode:
npm run start
With PM2
To use PM2 for managing the application:
npm run server
API Documentation
The application uses Swagger for API documentation.

Start the server.
Open your browser and go to:
http://localhost:3003/api-docs

Scripts
Command Description
npm run dev Run the app in development mode with hot reload.
npm run start Start the app in production mode.
npm run build Compile TypeScript to JavaScript.
npm run migration:run Run TypeORM migrations.
npm run migration:revert Revert the last migration.
npm run test Run tests with Jest.
