const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
var url = "mongodb+srv://hyphen0013:1wN3WmUNXSOvX8h1@cluster0-3j68b.mongodb.net/test?retryWrites=true&w=majority";
let _db;






const mongoConnect = callback => {
    MongoClient.connect(
        // url,
        'mongodb://localhost:27017/shop',
    
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    )
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
