import React, { useState } from "react";
import styled from "styled-components";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { Meteor } from "meteor/meteor";

const HeadingTag = styled.h1`
  background: #bf4f74;
  color: white;
  height: 5%;
  margin: 0 0 50px 0;
  display: flex;
  padding: 30px;
  justify-content: space-between;
  align-items: center;
`;
const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  flex-direction: column;
  height: 20%;
`;
const FormElements = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 70%;
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
export default ContactForm = ({
  contact,
  isEdit,
  setContact,
  handleUpdate,
  errorMsg,
  successMsg,
  handleSave,
  userDetails,
}) => {
  const logout = () => Meteor.logout();
  return (
    <>
      <HeadingTag>
        Meteor Wallet! <div onClick={logout}>{userDetails.username} 🚪</div>
      </HeadingTag>
      <Form>
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        {successMsg && <Alert severity="success">{successMsg}</Alert>}
        <FormElements>
          <FormSubElements>
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInputField
              id="name"
              value={contact.name}
              type="text"
              onChange={(e) =>
                setContact((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
            />
          </FormSubElements>
          <FormSubElements>
            <FormLabel htmlFor="email">Email</FormLabel>
            <FormInputField
              id="email"
              value={contact.email}
              type="text"
              onChange={(e) =>
                setContact((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }))
              }
            />
          </FormSubElements>
          <FormSubElements>
            <FormLabel htmlFor="imageUrl">ImageUrl</FormLabel>
            <FormInputField
              id="imageUrl"
              value={contact.imageUrl}
              type="text"
              onChange={(e) =>
                setContact((prevState) => ({
                  ...prevState,
                  imageUrl: e.target.value,
                }))
              }
            />
          </FormSubElements>
          <FormBtn type="button" onClick={isEdit ? handleUpdate : handleSave}>
            {isEdit ? "Save" : "Add Contact"}
          </FormBtn>
        </FormElements>
      </Form>
    </>
  );
};
