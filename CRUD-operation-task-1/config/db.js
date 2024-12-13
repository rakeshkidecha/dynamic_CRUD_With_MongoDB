const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/employeeData_project-1')

const db = mongoose.connection;

db.once('open',err=>console.log(err?err:"MongoDB connected..."));

module.exports = db;