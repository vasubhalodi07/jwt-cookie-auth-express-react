# JWT Management with Cookies using React, Express, and MongoDB

This project focuses on secure token management using JSON Web Tokens (JWT) in conjunction with cookie-based storage. Built with React, Express, and MongoDB, this system employs enhanced security measures, storing tokens in HTTP-only cookies.

### Features

- **Token Storage**: Secure storage of tokens in HTTP-only cookies.
- **Refresh Token Mechanism**: When the access token expires, a server middleware triggers a 401 response, prompting the client-side to initiate a call to the refresh token API. This creates a new access token, securely stored in the cookie storage.
- **Login Handling**: Upon logging in via the login API, the JWT token is stored in a cookie, and the login status is saved in local storage. The root page (`App.js`) retrieves the JWT token from the getToken API response, storing it in the Redux store for efficient state management.

## Installation

1. **Clone the Repository**: Begin by cloning this repository to your local machine using the following command:
    ```bash
    git clone https://github.com/vasubhalodi07/jwt-cookie-auth-express-react.git
    ```

2. **Frontend Setup**:
    - Navigate to the `frontend` directory:
        ```bash
        cd frontend
        ```
    - Install dependencies:
        ```bash
        npm install
        ```
    - Start the client server at `localhost:5173`:
        ```bash
        npm run dev
        ```

3. **Backend Setup**:
    - Move to the `backend` directory:
        ```bash
        cd backend
        ```
    - Install required packages:
        ```bash
        npm install
        ```
    - Run the server at `localhost:8000`:
        ```bash
        npm start
        ```

### Contribution

- Feel free to contribute via pull requests. Bug fixes, enhancements, and more are welcome!
