const User = require("../models/UserModel");
const controllerServices = require("../services/controllerServices");
const bcrypt = require("bcrypt");

const userController = {
  getAllUser: async (request, response) => {
    controllerServices.getAllData(request, response, User);
  },
  getUserById: async (request, response) => {
    controllerServices.getDataById(request, response, User);
  },

  changeUserInfo: async (request, response) => {
      controllerServices.changeInfo(request, response, User);
  },

  deleteAUser: async (request, response) => {
    controllerServices.softDeleteData(request, response, User);
  },

  changePassword: async (request, response) => {
    try {
      const { userId } = request.params;
      const password = request.body.password;

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.findByIdAndUpdate(userId, {
        password: hashedPassword,
      });

      const status = user ? 200 : 500;
      const message = user
        ? "Password Updated"
        : "Server Error";

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  addNewUser: async (request, response) => {
    try {
      const { username } = request.body
      const { emailAddress } = request.body.personalInfo

      const user = await User.findOne({ 
        $or: [
            {username},
            {emailAddress}
        ]
    });

      const newUser = new User(request.body);

      const status = user ? 403 : 200;
      const message = user
      ? "User already exist"
      : "New User saved successfully";

      const savedUser = user ? null : await newUser.save();

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (request, response) => {
    try {
      const { username, password } = request.body;
      const user = await User.find({username});

      const verifyPassword = await bcrypt.compare( password, user[0].password );

      const status = user ? 200 : 404;
      const message = user
        ? verifyPassword
          ? 'Login Success'
          : 'Invalid Credentials'
        : 'Username does not exist';

      return response.status(status).json({ message, userDetails: verifyPassword ? user[0]._id : null });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
