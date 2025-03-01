import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Alert from "./components/Alert";

function App() {
  const [jwtToken, setJwtToken] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertClassname, setAlertClassname] = useState("d-none");

  //const for token refresh timer
  const [tickInterval, setTickInterval] = useState();

  const navigate = useNavigate();

  //log out function
  const logOut = () => {
    const requestOptions = {
      method: "GET",
      credentials: "include",
    };

    fetch(`/logout`, requestOptions)
      .catch((e) => {
        console.log("error logging out", e);
      })
      .finally(() => {
        setJwtToken("");
        toggleRefresh(false);
      });
    navigate("/login");
  };

  const toggleRefresh = useCallback(
    (status) => {
      console.log("toggle clicked");

      if (status) {
        console.log("turning on ticking");

        let i = setInterval(() => {
          const requestOptions = {
            method: "GET",
            credentials: "include",
          };

          fetch(`/refresh`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
              if (data.access_token) {
                setJwtToken(data.access_token);
                toggleRefresh(true);
              }
            })
            .catch((error) => {
              console.log("user is not logged in ");
            });
        }, 600000);
        setTickInterval(i);
        console.log("setting tick interval to ", i);
      } else {
        console.log("turning off ticking");
        console.log("turning off tickInterval", tickInterval);
        setTickInterval(null);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  //function to refresh the token and keep the
  //user logged in
  useEffect(() => {
    if (jwtToken === "") {
      const requestOptions = {
        method: "GET",
        credentials: "include",
      };

      fetch(`/refresh`, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          if (data.access_token) {
            setJwtToken(data.access_token);
            toggleRefresh(true);
          }
        })
        .catch((error) => {
          console.log("user is not logged in ");
        });
    }
  }, [jwtToken, toggleRefresh]);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h1 className="mt-3">Go Watch a Movie!</h1>
        </div>
        <div className="col text-end">
          {jwtToken === "" ? (
            <>
              <Link to="/login">
                <span className="badge bg-success">Login</span>
              </Link>
              <br />
              <Link to="/register">
                <span className="badge bg-success">Register</span>
              </Link>
            </>
          ) : (
            <a href="#!" onClick={logOut}>
              <span className="badge bg-danger">Log out</span>
            </a>
          )}
        </div>
        <hr className="mb-3"></hr>
      </div>

      <div className="row">
        <div className="col-md-2">
          <nav>
            <div className="list-group">
              <Link to="/" className="list-group-item list-group-item-action">
                Home
              </Link>
              <Link
                to="/movies"
                className="list-group-item list-group-item-action"
              >
                Movies
              </Link>
              <Link
                to="/genres"
                className="list-group-item list-group-item-action"
              >
                Genres
              </Link>
              {jwtToken !== "" && (
                <>
                  <Link
                    to="/admin/movie/0"
                    className="list-group-item list-group-item-action"
                  >
                    Add Movie
                  </Link>

                  <Link
                    to="/manage-catalog"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Catalogue
                  </Link>

                  <Link
                    to="/graphql"
                    className="list-group-item list-group-item-action"
                  >
                    GraphQL
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
        <div className="col-md-10">
          <Alert message={alertMessage} className={alertClassname} />
          <Outlet
            context={{
              jwtToken,
              setJwtToken,
              setAlertClassname,
              setAlertMessage,
              toggleRefresh,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
