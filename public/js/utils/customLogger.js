export const customAsyncLogger = async (data) => {
  if (typeof data === "function") {
    const value = await data();
    console.log(value.data);
  } else {
    const value = await data;
    console.log(value.data);
  }
};
