# Airbnb Clone

This is a simplified Airbnb Clone built using **MERN stack** (MongoDB, Express.js, React.js, Node.js) with full functionality for user authentication, property management, and more.

---

## Features

### **User Authentication**
- Sign-up and sign-in functionality.
- User session management using **JWT**.
- State management for logged-in users using **Redux**.

### **Property Management**
- Retrieve and display a list of properties.
- View detailed property information on a dedicated page.
- Book properties through a booking API.

### **Favorites Functionality**
- Add properties to favorites.
- View a list of favorite properties.
- Remove properties from favorites.

### **Pages Implemented**
- **Authorization Page**: For login and signup.
- **Home Page**: Displays property listings.
- **Property Listing Page**: Showcases all available properties.
- **Property Details Page**: Displays detailed information about a specific property.

---

## Backend Overview

### **APIs Created**
- **Authentication APIs**:
  - Login (`/user/signin`)
  - Signup (`/user/signup`)
- **Property APIs**:
  - Get all properties (`/property/getAll`)
  - Get property details (`/property/:id`)
  - Book property (`/property/book`)
- **Favorites APIs**:
  - Add to favorites (`/user/addToFavourites`)
  - Get favorites (`/user/getUserFavourites`)
  - Remove from favorites (`/user/removeFavourite`)

### **Database**
- MongoDB is used for storing:
  - **Users**: Schema includes user details, encrypted passwords, and favorite properties.
  - **Properties**: Schema defines property information like name, location, price, and availability.

### **Controllers and Models**
- **Controllers**: Handle API logic (e.g., booking properties, managing users).
- **Models**: Define database schemas for **Users** and **Properties**.

---

## Frontend Overview

### **Technologies Used**
- **React.js** for building UI.
- **Redux** for managing application state.
- **Axios** for API integration.
- **React Router** for navigating between pages.

### **State Management**
- Reducers and actions implemented for handling user state and property data.

---

## How to Run

### **Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/airbnb-clone.git
   cd airbnb-clone
2. Install dependencies:
    ```bash
    npm install
3. Configure .env files:

 - Create .env in the server folder for:
 - MongoDB connection URL.
 - JWT secret key.

### **Run The Application**

1. Start the backend:
    ```bash
    cd server
    npm start
2. Start the frontend:
    ```bash
    cd client
    npm start
3. Access the Application
 - Open your browser and navigate to:

  ```arduino
    http://localhost:3000

