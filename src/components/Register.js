import { useState } from "react";
import Input from "./form/input";
import { useNavigate, useOutletContext } from "react-router-dom";

const Register = () => {
  const { setJwtToken } = useOutletContext();
  const { setAlertClassname } = useOutletContext();
  const { setAlertMessage } = useOutletContext();
  const { toggleRefresh } = useOutletContext();

  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = () => (event) => {
    let value = event.target.value;
    let name = event.target.name;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const requestBody = user;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    };

    fetch(`/register`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertClassname("alert-danger");
          setAlertMessage(data.message);
        } else {
          setJwtToken(data.access_token);
          toggleRefresh(true);
          setAlertClassname("d-none");
          setAlertMessage("");
          navigate("/");
        }
      })
      .catch((error) => {
        setAlertClassname("alert-danger");
        setAlertMessage(error);
      });
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h2>Register</h2>
      <hr />
      <form onSubmit={handleRegister}>
        <Input
          title="First Name"
          type="text"
          className="form-control"
          name="first_name"
          autocomplete="firstname-new"
          onChange={handleChange("first_name")}
          errorDiv={hasError("firstname") ? "text-danger" : "d-none"}
          errorMsg={"Please enter your firstname"}
        />
        <Input
          title="Last Name"
          type="text"
          className="form-control"
          name="last_name"
          autocomplete="lastname-new"
          onChange={handleChange("last_name")}
          errorDiv={hasError("lastname") ? "text-danger" : "d-none"}
          errorMsg={"Please enter your lastname"}
        />
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autocomplete="email-new"
          onChange={handleChange("email")}
          errorDiv={hasError("email") ? "text-danger" : "d-none"}
          errorMsg={"Please enter your email"}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autocomplete="password-new"
          onChange={handleChange("password")}
          errorDiv={hasError("password") ? "text-danger" : "d-none"}
          errorMsg={"Please enter a password"}
        />

        <Input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};

export default Register;
