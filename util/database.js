const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = callback => {
    MongoClient.connect(
        // 'mongodb+srv://hyphen0013:1wN3WmUNXSOvX8h1@cluster0-3j68b.mongodb.net/shop?retryWrites=true&w=majority',
        'mongodb://localhost:27017/shop',
        {
             useUnifiedTopology: true,
             useNewUrlParser: true 
        }
    )
        .then(client => {
            console.log('Connected to database...');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
        });
};

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database found!';
};


// const mongoConnect = async () => {
//     try {
//         await mongoose.connect('mongodb+srv://hyphen0013:ueFMqvGM6fMOxTiu@cluster0-3j68b.mongodb.net/test?retryWrites=true&w=majority', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true
//         });
//         console.log('Connected to database....');
//     } catch(e) {
//         console.log(e);
//         throw e;
//     }
    
// }

// module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;