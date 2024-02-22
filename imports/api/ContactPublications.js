import {Meteor} from 'meteor/meteor';
import { ContactCollection } from "./ContactCollection"


Meteor.publish('allcontacts',function publishAllContacts(){
    return ContactCollection.find();
})