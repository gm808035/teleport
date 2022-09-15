const { connect } = require("../service/ws-connect");

const connectHandler = async (event, context) => await connect(event, context);
module.exports = {
  connectHandler,
};
