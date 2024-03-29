import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import  '../imports/api/ContactCollection';
import '../imports/api/ContactMethods'
import '../imports/api/ContactPublications'
import '../imports/api/UserMethods';

const SEED_USERNAME = 'meteorite';
const SEED_PASSWORD = 'password';

Meteor.startup(() => {
  if (!Accounts.findUserByUsername(SEED_USERNAME)) {
    Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
