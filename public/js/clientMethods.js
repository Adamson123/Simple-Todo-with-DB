import axios$1 from "../node_modules/axios/dist/esm/axios.js";
import { customAsyncLogger } from "./utils/customLogger.js";

const methods = {
  allTasks: [],
  axios: axios$1,
  resultInfoFunc: (info, index) => {
    const resultInfo = document.querySelectorAll(".resultInfo");

    resultInfo[index].textContent = info;
  },
  fetchTasks: async () => {
    try {
      const json = await methods.axios.get("http://localhost:4050/v1/task");
      // resultInfoFunc("")
      const { data, status } = json;
      return data;
    } catch (error) {
      throw new Error(error.response.data);
    }
  },

  patchTask: async (value, updating) => {
    try {
      const updatedData = await methods.axios.patch(
        `http://localhost:4050/v1/task/${value.id}`,
        { [updating]: value.newValue }
      );
      // methods.resultInfoFunc("",index);
    } catch (error) {
      if (error.response.data) {
        //  methods.resultInfoFunc(error.response.data,index);
      }
    }
  },
  deleteTask: async (id) => {
    try {
      const updatedData = await methods.axios.delete(
        `http://localhost:4050/v1/task/${id}`
      );
      methods.resultInfoFunc("", 0);
    } catch (error) {
      if (error.response.data) {
        throw new Error(error.response.data);
      }
    }
  },
  createNewTask: async () => {
    try {
      const inputTask = document.querySelector(".inputTask");
      const json = await methods.axios.post("http://localhost:4050/v1/task", {
        task: inputTask.value,
      });
      inputTask.value = "";
      methods.resultInfoFunc("", 0);
      console.log(methods.allTasks);
      methods.allTasks.push(json.data);
    } catch (error) {
      if (error.response.data) {
        throw new Error(error.response.data);
      }
    }
  },
};

export default methods;
