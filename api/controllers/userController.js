const User = require('../models/UserModel');
const mongoose = require('mongoose');

//get all users
const getUsers = async(req,res) => {
    const users = await User.find({}).sort({createdAt: -1});
  
    res.status(200).json(users);
  };
  
  //get a single user
  const getUser = async(req,res) =>{
    const {_id} = req.params;
  
    //checking if _id is valid 12 byte /24 hex string or integer
    if (!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).json({error: 'No such user'});
    }
    
    const user = await User.findById(_id);
  
    if(!user) {
      return res.status(404).json({eror: 'No user found'});
    }
  
    res.status(200).json(user);
  };
  
  //create a new user
  const createUser = async(req,res) => {
    const user = new User(req.body);
  
    try {
      const newUser = await user.save();
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  //delete a user
  const deleteUser = async (req,res) => {
    const {_id} = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).json({error: 'No such user'});
    }
    
    const user = await User.findByIdAndDelete(_id);
  
    if(!user) {
      return res.status(404).json({error: 'No user found'});
    }
  
    res.status(200).json(user);
  };
  
  //update a user
  const updateUser = async (req, res) => {
    const {_id} = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(_id)){
      return res.status(404).json({error: 'No such user'});
    }
  
    const user = await User.findByIdAndUpdate(req.params._id, req.body, { new: true });
  
    if(!user) {
      return res.status(404).json({eror: 'No user found'});
    }
  
    res.json(user);
  };
  
  module.exports = {
    createUser, getUsers, getUser, deleteUser, updateUser
  };