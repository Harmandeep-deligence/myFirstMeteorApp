import { Meteor } from "meteor/meteor";
import { ContactCollection } from "./ContactCollection";
import { check } from "meteor/check";

Meteor.methods({
  "contacts.insert"({ name, email, imageUrl,ownerId }) {
    check(name, String);
    check(email, String);
    check(imageUrl, String);
    check(ownerId,String);
    if (!name) {
      throw new Meteor.Error("Name is required");
    }
    return ContactCollection.insert({
      name,
      email,
      imageUrl,
      ownerId,
      createdAt: new Date(),
    });
  },
  "contacts.remove"({ contactId }) {
    check(contactId, String);

    return ContactCollection.remove(contactId);
  },
  "contacts.update"(contact) {
    check(contact.name, String);
    check(contact.email, String);
    check(contact.imageUrl, String);

    return ContactCollection.update(contact._id, {
      $set: {
        name: contact.name,
        email: contact.email,
        imageUrl: contact.imageUrl,
        createdAt: new Date(),
      },
    });
  },
});
