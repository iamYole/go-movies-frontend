import { useState } from "react";
import Input from "./form/input";
import { useNavigate, useOutletContext } from "react-router-dom";

const Register = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setJwtToken } = useOutletContext();
  const { setAlertClassname } = useOutletContext();
  const { setAlertMessage } = useOutletContext();

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    //build the payload
    let payload = {
      first_name: firstname,
      last_name: lastname,
      email: email,
      password: password,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    };

    fetch(`/register`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setAlertClassname("alert-danger");
          setAlertMessage(data.message);
        } else {
          setJwtToken(data.access_token);
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
          name="firstname"
          autocomplete="firstname-new"
          onChange={(event) => {
            setFirstname(event.target.valus);
          }}
        />
        <Input
          title="Last Name"
          type="text"
          className="form-control"
          name="lastname"
          autocomplete="lastname-new"
          onChange={(event) => {
            setLastname(event.target.valus);
          }}
        />
        <Input
          title="Email Address"
          type="email"
          className="form-control"
          name="email"
          autocomplete="email-new"
          onChange={(event) => {
            setEmail(event.target.valus);
          }}
        />
        <Input
          title="Password"
          type="password"
          className="form-control"
          name="password"
          autocomplete="password-new"
          onChange={(event) => {
            setPassword(event.target.valus);
          }}
        />

        <Input type="submit" className="btn btn-primary" value="Register" />
      </form>
    </div>
  );
};

export default Register;
