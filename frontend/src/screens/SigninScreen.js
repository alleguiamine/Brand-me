import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Button, Container, TextField, Typography } from "@mui/material";

export default function SigninScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;
  const dispatch = useDispatch();

  const redirect = userInfo && userInfo.isAdmin ? "/dashboard" : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

  const handleRegisterClick = () => {
    props.history.push(`/register?redirect=${redirect}`);
  };

  return (
    <Container style={{ marginTop: '80px' }} maxWidth="sm">
      <form onSubmit={submitHandler}>
        <Typography variant="h4">Se connecter</Typography>
        {loading && <LoadingBox />}
        {error && <MessageBox variant="danger">{error}</MessageBox>}
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
        <Button variant="contained" color="primary" type="submit">
          Se connecter
        </Button>
        <div className="newCust">
          Nouveau client ?{" "}
          <Button onClick={handleRegisterClick}>Créez votre compte</Button>
        </div>
      </form>
    </Container>
  );
}
