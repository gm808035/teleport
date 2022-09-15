const { create, get, update, deleteUser } = require("../service/user");
const createUserHandler = async (event, context, callback) =>
  await create(event, context, callback);
const getUserHandler = async (event, context, callback) =>
  await get(event, context, callback);
const updateUserHandler = async (event, context, callback) =>
  await update(event, context, callback);
const deleteUserHandler = async (event, context, callback) =>
  await deleteUser(event, context, callback);

module.exports = {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
