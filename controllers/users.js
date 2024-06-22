const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Users']
    const db = mongodb.getDatabase();
    contactsCollection = db.db().collection('contacts');
    const users = await contactsCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = req.params.id;
    const objectId = ObjectId.createFromHexString(userId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('contacts').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

const createUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').insertOne(userData);
        if(response.acknowledged) {
            res.status(204).send('User created successfully');
        } else {
            res.status(500).send('Error creating user');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating user');
    };

};
const updateUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    const userColor = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').replaceOne({ _id: userId }, userColor);
        if(response.modifiedCount > 0) {
            res.status(201).send('User updated successfully');  
        } else {
            res.status(500).json(response.error || "Error updating user");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating user');
    };
};

const deleteUser = async (req, res) => {
    //#swagger.tags=['Users']
    const userId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: userId });
        if(response.deletedCount > 0) {
            res.status(204).send('User deleted successfully');
        } else {
            res.status(500).send('Error deleting user');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting user');
    }
};


module.exports = { getAll, getSingle, createUser, updateUser, deleteUser};
