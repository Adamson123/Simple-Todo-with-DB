const model = require("../mongo/model");
const asyncWrapper = require("../middleware/asyncwrapper");
const { createErrorMessage } = require("../error/CustomError");

const methods = {
  getAllTasks: asyncWrapper(async (req, res, next) => {
    const data = await model.find({});
    if (!data) {
      const error = createErrorMessage("No task was found", 404);
      return next(error);
    }
    res.status(200).json(data);
  }),
  getSingleTask: asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const data = await model.findOne({ _id: taskID });
    if (!data) {
      const error = createErrorMessage("Task does not exist", 404);
      return next(error);
    }

    res.status(200).json(data);
  }),
  addNewTask: asyncWrapper(async (req, res, next) => {
    const newData = req.body;

    let data;
    if (newData.task) {
      data = await model.create(newData);
    } else {
      const error = createErrorMessage("Please enter task name", 400);
      console.log("error");
      return next(error);
    }
    res.status(200).json(data);
  }),
  editTask: asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const newData = req.body;
    const data = await model.findOneAndUpdate({ _id: taskID }, newData);

    if (!data) {
      const error = createErrorMessage("Invalid task id", 400);

      return next(error);
    }

    res.status(200).json(data);
  }),
  deleteTask: asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const data = await model.findOneAndDelete({ _id: taskID });
    if (!data) {
      const error = createErrorMessage("Invalid task id", 400);
      return next(error);
    }
    res.status(200).json(data);
  }),
};

module.exports = methods;
