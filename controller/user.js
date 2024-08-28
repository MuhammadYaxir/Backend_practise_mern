import { MongoCryptAzureKMSRequestError } from "mongodb";
import User from "../models/user.js";

export const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
      }
      const isEmailExisted = await User.findOne({ email });
      if (isEmailExisted) {
        return res.status(400).json({ message: "Email already exists" });
      }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({
        message: "User created successfully",
        success: true,
        data: user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUserData = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send("Server Error");
    }
  };

  // PUT: Update an item
export const updateData =  async (req, res) => {
    try {
        const updatedItem = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if(!updateData){
            return res.status(404).json({message: 'Item not found'});
          }
            res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// FIND BY ID
export const getById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await User.findById(itemId);

    if (!item) {
      return res.status(404).send('Item not found');
    }

    res.json(item);
  } catch (err) {
    res.status(500).send('Server error');
  }
};


// DELETE: Delete an item
export const deleteData = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};