const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;
const ObjectId = mongodb.ObjectId;


class User {
  constructor(username, email) {
    this.username;
    this.email;
  }

  // Save user to database
  save() {
    const db = getDb();
    return db
    .collection('users')
    .insertOne(this)
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
  }

  // Find user by id
  static findById(userId) {
    const db = getDb();
    return db
    .collection('users')
    .findOne({ _id: new ObjectId(userId)})
    .then(user => {
      console.log(user);
      return user;
    })
    .catch(err => {
      console.log(err);
    });
  }

}

module.exports = User;