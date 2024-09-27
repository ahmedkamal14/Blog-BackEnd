# Blog Backend API

This API serves as the backend for the Blog Website. It handles user authentication, blog post CRUD operations, and image uploads. The API is currently deployed and running on Railway at:

[https://blogp-backend.up.railway.app](https://blogp-backend.up.railway.app)

## Routes

### 1. `/auth`  
Responsible for user authentication.  
**Controllers:**

- **POST `/login`**  
  Responsible for user login.  
  **Body Parameters:**
  ```json
  {
    "email": "user@example.com",
    "password": "userpassword"
  }

- **POST `/register`**  
  Responsible for registering new users.  
  **Body Parameters:**
  ```json
  {
    "name": "newuser",
    "email": "newuser@example.com",
    "password": "newpassword"
  }

### 2. `/blogs`  
Responsible for dealing with CRUD operations on blog posts.  
**Controllers:**

- **GET `/`**  
  Retrieves all blog posts for a certain user.

- **POST `/`**  
  Creates a new post for the user.  
  **Body Parameters:**
  ```json
  {
    "title": "Post Title",
    "content": "Post Content",
  }

- **GET `/:id`**  
  Retrieves a single post with the specified ID.

- **PATCH `/:id`**  
  Updates a post with the specified ID.  
  **Body Parameters:**
  ```json
  {
    "title": "Updated Title",
    "content": "Updated Content"
  }

- **DELETE `/:id`**  
  Deletes a post with the specified ID.


### 3. `/uploads`  
Responsible for uploading post images and user profile pictures to Cloudinary, and storing their links in the database.  
**Controllers:**

- **POST `/upload-profile-pic`**  
  Uploads a user profile picture to Cloudinary.

- **POST `/upload-post-img`**  
  Uploads an image for a blog post to Cloudinary.

## Database

This API uses **MongoDB** to store user data, blog posts, and image URLs.

## Environment Variables

Make sure to have a .env file with the required Variables.

