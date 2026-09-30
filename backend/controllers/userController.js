const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const createUser = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User Not Found ",
      });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req , res , next ) => {
 
    try{
    const user = await User.findByIdAndUpdate(req.params.id , { name: req.body.name , email: req.body.email}, 
        {new: true}
    ) ;

    if(!user){
        return res.status(404).json({
            message: "User Not Found"
        });
    }
     
    res.json({
       message: "User Update Successfully ",
       user
    });    

}catch(error){
    next(error);
}
    
};

const deleteUser = async (req, res , next) => {
     
    try{
    const user = await User.findByIdAndDelete(req.params.id);

    if(!user){
        return res.status(404).json({
         message: " User Not Found"
        });
    }

    res.json({
         message: "User Delete Successfully",
         user
    });
}catch(error){
    next(error);
}
};



module.exports = { createUser, getUsers , getUserById ,  updateUser , deleteUser};
