const jwt = require('jsonwebtoken');
require('dotenv').config();
const Admin = require('../models/Admin');

const adminLogin = async (req, res) => {

    try {
      const admin = await Admin.findOne({ username: req.body.username });
      if (!admin) {
        return res.status(400).send({ error: 'Invalid credentials' });
      }
  
      const isMatch = await admin.comparePassword(req.body.password);
      if (!isMatch) {
        return res.status(400).send({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
      admin.tokens = admin.tokens.concat({ token });
      await admin.save();
      console.log("Admin logged in successfully",admin);
      res.send({ admin, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }

module.exports = {
    adminLogin
};
