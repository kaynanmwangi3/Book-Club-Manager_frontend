# BookClub Manager

## Overview
Book Club Manager is a full-stack web application designed to streamline the management of book clubs, connecting avid readers and fostering a community around literature. Built with a robust backend using Flask and a dynamic frontend with React, this project offers a seamless experience for users to create, join, and manage book clubs, track reading progress, and engage in discussions.

## Contributors
- Kaynan Mwangi (kaynanmwangi6@gmail.com)
- John Atieli (johnatieli@gmail.com)

## Features
- **User Management**: Register and log in to personalize your experience, with secure authentication and profile updates.
- **Club Creation and Membership**: Start your own book club or join existing ones, with support for multiple members and clubs per user.
- **Book Tracking**: Add books, with details like title, author, and publication year.
- **Dynamic Dashboard**: A post-login landing page displays popular choice books, recent books, and book reviews.
- **Data Persistence**: Utilizes SQLAlchemy with a SQLite database to store user, book, and club data, including many-to-many relationships for enhanced functionality.
- **Responsive Design**: A clean, user-friendly interface inspired by modern book club platforms, with navigation across multiple routes (Clubs, Members, Bookshelf, Schedule, Analytics).

## Technologies
### Frontend
- **React**: ^19.1.1
- **React DOM**: ^19.1.1
- **React Router DOM**: ^7.9.2
- **Formik**: ^2.4.6
- **Yup**: ^1.7.1
- **Axios**: ^1.12.2
- **Boxicons**: ^2.1.4

### Backend
- **Flask**: *
- **Flask-CORS**: *
- **Flask-RESTful**: *
- **Faker**: *
- **Gunicorn**: *
- **Psycopg2-binary**: *
- **Flask-SQLAlchemy**: *
- **Flask-Migrate**: *
- **SQLAlchemy-Serializer**: *

## Getting Started

### Prerequisites
- **Node.js**: Version higher than 18
- **Python**: Version 3.8 or higher

### Installation

#### Frontend
1. Clone the repository:  
   ```bash
   git clone https://github.com/kaynanmwangi3/Book-Club-Manager_backend
   ```
2. Install dependencies:  
   ```bash
   npm install
   ```
3. Start the development server:  
   ```bash
   npm run dev
   ```
   or  
   ```bash
   npm start
   ```

#### Backend
1. From the README, click the backend link to the backend repository, then clone it:  
   ```bash
   git clone https://github.com/kaynanmwangi3/Book-Club-Manager_backend
   ```
2. Install dependencies:  
   ```bash
   pipenv install
   ```
   or  
   ```bash
   pip install -r requirements.txt
   ```
3. Activate the virtual environment (if using Pipenv):  
   ```bash
   pipenv shell
   ```
   or (if using pip):  
   ```bash
   # No additional shell command needed
   ```
4. Run the Flask application:  
   ```bash
   flask run
   ```
   or  
   ```bash
   python app.py
   ```

## Usage
- After starting both the frontend and backend servers, navigate to `http://localhost:5173` (or the port specified by `npm run dev`) in your browser.
- Log in or register to access the dashboard, where you can create clubs, add books, and manage memberships.

## Known Bugs
- **Book Delete/Update**: The backend implements delete and update functionality for books, but the frontend has not yet implemented these features, so they do not work in the user interface.
- **Club Update**: The update function for clubs is not implemented in either the frontend or backend.
- **Loading Time**: Takes an almost extensive time range 1-2 minutes to fetch the api.

## Contributing
Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request with your changes.

## License
No license specified.

## Acknowledgements
- Special thanks to the open-source communities behind Flask, React, and other dependencies for making this project possible.

