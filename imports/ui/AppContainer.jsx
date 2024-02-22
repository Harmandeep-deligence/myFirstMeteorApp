import React, { useEffect, useState } from "react";
import ContactForm from "./ContactForm";
import { ContactList } from "./ContactList";
import LoginInForm from "./LoginInForm";
import { useTracker } from 'meteor/react-meteor-data';


export const AppContainer = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    imageUrl: "",
  });
  const [user, setUser] = useState({
    password: "",
    username: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const userDetails = useTracker(() => Meteor.user());
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
  useEffect(() => {
    setIsEdit(isEdit);
  }, [isEdit]);
 const ownerId=Meteor.userId()
  const handleSave = () => {
    Meteor.call(
      "contacts.insert",
      {
        name: contact.name,
        email: contact.email,
        imageUrl: contact.imageUrl,
        ownerId:ownerId
      },
      (error) => {
        if (error) {
          onError({ message: error.error });
        } else {
          setContact({ name: "", email: "", imageUrl: "" });
          onSuccess({ message: "User Added" });
        }
      }
    );
  };

  const handleLogin = (username,password) => {
    Meteor.call(
      "user.login",
      {
        username: username,
        password:password,
      },
      (error) => {
        if (error) {
          onError({ message: error.error });
        } else {
          onSuccess({ message: "User Logged In" });
          Meteor.loginWithPassword(username, password);

        }
      }
    );
  };

  const handleUpdate = () => {
    Meteor.call(
      "contacts.update",

      {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        imageUrl: contact.imageUrl,
      },

      (error) => {
        if (error) {
          onError({ message: error.error });
        } else {
          setContact({ name: "", email: "", imageUrl: "" });
          onSuccess({ message: "User Updated" });
          setIsEdit(false);
        }
      }
    );
  };
  return (
    <div>
      {userDetails ? (
        <>
          <ContactForm
            isEdit={isEdit}
            contact={contact}
            setContact={setContact}
            handleUpdate={handleUpdate}
            handleSave={handleSave}
            errorMsg={errorMsg}
            successMsg={successMsg}
            userDetails={userDetails}
          />
          <ContactList
            setIsEdit={setIsEdit}
            setContact={setContact}
            ownerId={ownerId}
          />
        </>
      ) : (
        <LoginInForm
          user={user}
          setUser={setUser}
          onError={onError}
          onSuccess={onSuccess}
          handleLogin={handleLogin}
        />
      )}
    </div>
  );
};
