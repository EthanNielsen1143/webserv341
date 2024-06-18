const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const db = mongodb.getDatabase();
    contactsCollection = db.db().collection('contacts');
    const users = await contactsCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
};

const getSingle = async (req, res) => {
    const userId = req.params.id;
    const objectId = ObjectId.createFromHexString(userId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('contacts').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

module.exports = { getAll, getSingle};
