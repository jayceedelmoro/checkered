const User = require("../models/UserModel");
const bcrypt = require("bcrypt");

const userController = {
  getUserById: async (request, response) => {
    try {
      const { userId } = request.params;
      const user = await User.findById(userId);

      const status = user ? 200 : 404;
      const message = user
        ? user
        : "User Does Not Exist";

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  changeUserInfo: async (request, response) => {
    try {
      const { userId } = request.params;

      const user = await User.findByIdAndUpdate(
        userId,
        request.body,
        {
            new: true
        }
      );

      const status = user ? 200 : 404;
      const message = user
        ? "Update Success"
        : "User Does Not Exist";

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
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

  deleteAUser: async (request, response) => {
    try {
      const { userId } = request.params;
      const user = await User.findById(userId);

      await User.findOneAndUpdate({ _id: userId }, { isDeleted: true });

      const status = user ? 200 : 404;
      const message = user
        ? "User deleted"
        : "User Does Not Exist";

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  addNewUser: async (request, response) => {
    try {
      const newDocument = new User(request.body);

      const savedUser = await newDocument.save();

      const authService = new AuthService();
      await authService.addAccess(savedUser.id, ["STUDENT"]);

      const taskService = new TaskService();
      await taskService.createInitialTask(
        savedUser.id,
        savedUser.sponsorsSectionData.sponsors
      );

      response.status(201).json({ message: "Document saved successfully" });
    } catch (error) {
      console.error(error);
      response.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
