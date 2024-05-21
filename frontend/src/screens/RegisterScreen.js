import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button, Container, TextField, Typography } from "@mui/material";

export default function RegisterScreen(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null); // State to hold the image file

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and confirm password do not match");
    } else {
      const formData = new FormData(); // Create FormData object
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("image", image); // Append the image file

      dispatch(register(formData)); // Pass FormData to the register action
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const handleRegisterClick = () => {
    props.history.push(`/signin?redirect=${redirect}`);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Set the image file when selected
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "80px" }}>
      <form className="form" onSubmit={submitHandler}>
        <Typography variant="h4">Créer un compte</Typography>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        <TextField
          fullWidth
          id="name"
          label="Nom et Prénom"
          variant="outlined"
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          id="email"
          label="Adresse e-mail"
          variant="outlined"
          margin="normal"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          fullWidth
          id="password"
          label="Mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <TextField
          fullWidth
          id="confirmPassword"
          label="Confirmez le mot de passe"
          variant="outlined"
          margin="normal"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {/* Input field for image upload */}
        <TextField
        type="file"
        label="Image"
        InputLabelProps={{ shrink: true }}
        inputProps={{ accept: 'image/*' }}
        onChange={handleImageChange}
        style={{ margin: "16px 0" }}
      />
        <br /> {/* Ajoutez cette ligne pour le retour à la ligne */}

        <Button variant="contained" color="primary" type="submit">
          Registre
        </Button>
        <div className="newCust">
          Vous avez déjà un compte?{" "}
          <Button onClick={handleRegisterClick}>Se Connecter </Button>
        </div>
      </form>
    </Container>
  );
}
