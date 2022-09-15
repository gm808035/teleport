const { sendmsg } = require("../service/send-message");

const sendMessageHandler = async (event, context) =>
  await sendmsg(event, context);
module.exports = {
  sendMessageHandler,
};
