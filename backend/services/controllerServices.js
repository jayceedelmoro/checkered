const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substring(1, txt.length - 1).toLowerCase();
    }
  );
}

const controllerServices = {
  getAllData: async (request, response, model) => {
    try {
      const modelName = model.collection.collectionName
      const result = await model.find();

      return response.status(200).json({ message: result });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  getDataById: async (request, response, model) => {
    try {
      const { id } = request.params;
      const modelName = model.collection.collectionName
      const result = await model.findById(id);

      const status = result ? 200 : 404;
      const message = result
        ? result
        : `${ toTitleCase(modelName) } Does Not Exist`;

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  changeInfo: async (request, response, model) => {
    try {
      const { id } = request.params;
      const modelName = model.collection.collectionName

      const result = await model.findByIdAndUpdate(
        id,
        request.body,
        {
            new: true
        }
      );

      const status = result ? 200 : 404;
      const message = result
        ? "Update Success"
        : `${ toTitleCase(modelName) } Does Not Exist`;

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  softDeleteData: async (request, response, model) => {
    try {
      const { id } = request.params;
      const modelName = model.collection.collectionName

      const result = await model.findOneAndUpdate({ _id: id }, { isDeleted: true });

      const status = result ? 200 : 404;
      const message = result
        ? `${ toTitleCase(modelName) } deleted`
        : `${ toTitleCase(modelName) } Does Not Exist`;

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },

  deleteData: async (request, response, model) => {
    try {
      const { id } = request.params;
      const modelName = model.collection.collectionName

      const result = await model.findOneAndDelete(id);

      const status = result ? 200 : 404;
      const message = result
        ? `${ toTitleCase(modelName) } deleted`
        : `${ toTitleCase(modelName) } Does Not Exist`;

      return response.status(status).json({ message: message });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = controllerServices;
