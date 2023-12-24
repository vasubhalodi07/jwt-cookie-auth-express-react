import { useSelector } from "react-redux";

const Home = () => {
  const { loginStatus } = useSelector((state) => state.userKey);

  return (
    <div className="main-content">
      <div className="content">
        <div>
          In this project, I've implemented robust features to manage JSON web
          tokens securely. The system stores these tokens in cookies with
          enhanced security measures like httpOnly. On the backend, there's an
          API dedicated to verifying these tokens.
        </div>
        <div>
          For the frontend, I've established a refresh token mechanism through
          an Axios instance. When the access token expires, a server middleware
          triggers a 401 response to the client. In response, the client-side
          initiates a call to the refresh token API, creating a new access token
          and securely storing it in the cookie storage.
        </div>
        <div>
          Moreover, upon logging in via the login API, the JWT token is stored
          in a cookie, and the login status is saved in local storage.
          Subsequently, upon entering the website, the root page (App.js) makes
          a call to the getToken API. This API response includes the JWT token,
          which is then stored in the Redux store for efficient state
          management.
        </div>
      </div>
    </div>
  );
};

export default Home;
