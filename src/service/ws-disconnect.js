const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

const disconnect = async (event, context) => {
  await ddb
    .delete({
      TableName: process.env.table,
      Key: {
        connectionId: event.requestContext.connectionId,
      },
    })
    .promise();
  return {
    statusCode: 200,
  };
};

module.exports = {
  disconnect,
};
