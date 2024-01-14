const controllerServices = require("../services/controllerServices");
const Task = require("../models/TaskModel");

const userController = {
  getAllTask: async (request, response) => {
    controllerServices.getAllData(request, response, Task);
  },

  getTaskById: async (request, response) => {
    controllerServices.getDataById(request, response, Task);
  },

  changeTaskInfo: async (request, response) => {
      controllerServices.changeInfo(request, response, Task);
  },

  deleteATask: async (request, response) => {
    controllerServices.deleteData(request, response, Task);
  },

  addNewTask: async (request, response) => {
    try {

      const newTask = new Task(request.body).save();

      return response.status(200).json({ message: 'Task created successfully' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  getTaskByUserId: async (request, response) => {
    try {
      const userId = request.params.id;
      const result = await Task.find({ ownerId: userId });
      console.log( userId )

      const status = result ? 200 : 204;
      const message = result
        ? result
        : `${ toTitleCase(modelName) } List Empty`;

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = userController;
