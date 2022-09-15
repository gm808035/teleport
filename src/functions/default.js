const { helloHandler } = require("../service/default");
const defaultHandler = async (event, context) => helloHandler(event, context);
module.exports = {
  defaultHandler,
};
