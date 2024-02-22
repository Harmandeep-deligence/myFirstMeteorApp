import React, { useState } from "react";
import { ContactCollection } from "../api/ContactCollection";
import { useSubscribe, useFind } from "meteor/react-meteor-data";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Alert from "@mui/material/Alert";

const HeadingTag = styled.h1`
  color: #bf4f74;
  width: 100%;
  height: 10%;
  margin: 50px auto;
  display: flex;
  padding: 5px 0px;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const ListItems = styled.div`
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 90%;
`;
const IconGroup = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
  width: 15%;
`;
const ListItemIcons = styled.div`
  display: flex;
  padding: 5px;
  justify-content: space-between;
  align-items: center;
`;

export const ContactList = ({  setContact, setIsEdit ,ownerId}) => {
  const isLoading = useSubscribe("allcontacts");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onError = ({ message }) => {
    setErrorMsg(message);
    setTimeout(() => {
      setErrorMsg("");
    }, 3000);
  };
  const onSuccess = ({ message }) => {
    setSuccessMsg(message);
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };
  const theme = createTheme({
    typography: {
      h5: {
        color: "#bf4f74",
      },
      subtitle1: {
        color: "#8b7fe9",
      },
    },
    icon: {
      color: "#bf4f74",
      cursor: "pointer",
      "&:hover": {
        color: "#8f0b37",
      },
    },
  });

  const contacts = useFind(() => {
    return ContactCollection.find({ ownerId: ownerId }, { sort: { createdAt: -1 } });
  });
  const removeContact = (_id) => {
    return Meteor.call("contacts.remove", { contactId: _id }, (error) => {
      if (error) {
        onError({ message: error.error });
      } else {
        onSuccess({ message: "User Deleted" });
      }
    });
  };
  const updateContact = (i) => {
    setContact(i);
    setIsEdit(true);
  };
  if (isLoading()) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <HeadingTag>Contact List({`${contacts.length}`})</HeadingTag>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}
      <ListItems>
        {contacts.map((i) => (
          <>
            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
                <ListItemIcons>
                  {" "}
                  <Avatar alt={`${i.name}`} src={`${i.imageUrl}`} />
                  <IconGroup>
                    <EditIcon
                      sx={{
                        color: "#bf4f74",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#8f0b37",
                        },
                      }}
                      onClick={() => updateContact(i)}
                    />
                    <DeleteIcon
                      sx={{
                        color: "#bf4f74",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#8f0b37",
                        },
                      }}
                      onClick={() => removeContact(i._id)}
                    />
                  </IconGroup>
                </ListItemIcons>

                <ThemeProvider theme={theme}>
                  <Typography variant="h5" component="div">
                    {i.name}
                  </Typography>{" "}
                  <Typography variant="subtitle1" component="div">
                    {i.email}
                  </Typography>
                </ThemeProvider>
              </CardContent>
            </Card>
          </>
        ))}
      </ListItems>
    </>
  );
};
