import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import styled from "styled-components";
import Alert from "@mui/material/Alert";

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  flex-direction: column;
  height: 100vh;
`;
const FormElements = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 70%;
  height: 30%;
  flex-direction: column;
`;
const FormSubElements = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 25%;
`;
const FormBtn = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 10%;
  font-size: 14px;
  background-color: #bf4f74;
  color: white;
  border: 1px solid transparent;
  border-radius: 5px;
  padding: 10px;
  font-weight: 700;
  cursor: pointer;
`;
const FormInputField = styled.input`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: 14px;
`;
const FormLabel = styled.label`
  font-size: 14px;
  color: #bf4f74;
  font-weight: 700;
`;
export default ContactForm = ({ user, setUser, handleLogin }) => {
  const submit = (e) => {
    e.preventDefault();
    handleLogin(user.username, user.password);
    // Meteor.loginWithPassword(user.username, user.password);
  };

  return (
    <Form>
      <FormElements>
        <FormSubElements>
          <FormLabel htmlFor="email">Username</FormLabel>
          <FormInputField
            id="username"
            value={user.username}
            type="text"
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                username: e.target.value,
              }))
            }
          />
        </FormSubElements>
        <FormSubElements>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInputField
            id="password"
            value={user.password}
            type="text"
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
        </FormSubElements>
        <FormBtn type="submit" onClick={submit}>
          Come Inside
        </FormBtn>
      </FormElements>
    </Form>
  );
};
