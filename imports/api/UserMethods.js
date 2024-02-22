import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import { Accounts } from 'meteor/accounts-base';


Meteor.methods({
    "user.login"({username,password}) {
    check(username, String);
    check(password, String);
    if (!username) {
      throw new Meteor.Error("Name is required");
    }
     if (!Accounts.findUserByUsername(username)) {
       return Accounts.createUser({
          username:username,
          password: password,
        });
      }
  }
});
