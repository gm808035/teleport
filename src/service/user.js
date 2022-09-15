const db = require("./db-conn").connect;
const { QueryTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const create = async (event, context, callback) => {
  const sequelize = await db();
  const body = JSON.parse(event.body);
  const id = uuidv4();

  try {
    await sequelize.query(
      "INSERT INTO public.users (connectionId, name) VALUES(:connectionId, :name)",
      {
        type: QueryTypes.INSERT,
        replacements: { connectionId: id, name: body.name },
      }
    );

    const users = await sequelize.query(
      "SELECT * FROM users where connectionId = :id",
      {
        type: QueryTypes.SELECT,
        replacements: { id: id },
      }
    );
    console.log(users[0].connectionid.replace(/^\s+|\s+$/gm, ""));
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        conncectionId: users[0].connectionid.replace(/^\s+|\s+$/gm, ""),
        name: users[0].name.replace(/^\s+|\s+$/gm, ""),
      }),
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
    callback(null, response);
  }
};

const update = async (event, context, callback) => {
  const sequelize = await db();
  const body = JSON.parse(event.body);
  const { id } = event.pathParameters;
  try {
    await sequelize.query(
      "UPDATE public.users  SET name= :name WHERE connectionId= :id",
      {
        type: QueryTypes.UPDATE,
        replacements: { id: id, name: body.name },
      }
    );

    const users = await sequelize.query(
      "SELECT * FROM users where connectionId = :id",
      {
        type: QueryTypes.SELECT,
        replacements: { id: id },
      }
    );

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        conncectionId: users[0].connectionid.replace(/^\s+|\s+$/gm, ""),
        name: users[0].name.replace(/^\s+|\s+$/gm, ""),
      }),
    };

    callback(null, response);
  } catch (error) {}
  console.log(error);
  const response = {
    statusCode: 500,
    body: JSON.stringify({ message: "Internal server error" }),
  };
  callback(null, response);
};

const get = async (event, context, callback) => {
  const sequelize = await db();
  const { id } = event.pathParameters;
  try {
    const user = await sequelize.query(
      "SELECT * FROM users where connectionId = :id",
      {
        type: QueryTypes.SELECT,
        replacements: { id: id },
      }
    );

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        conncectionId: user[0].connectionid.replace(/^\s+|\s+$/gm, ""),
        name: user[0].name.replace(/^\s+|\s+$/gm, ""),
      }),
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
    callback(null, response);
  }
};

const deleteUser = async (event, context, callback) => {
  const sequelize = await db();
  const { id } = event.pathParameters;
  try {
    await sequelize.query("DELETE FROM public.users WHERE connectionId= :id", {
      type: QueryTypes.DELETE,
      replacements: { id: id },
    });

    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "User Deleted" }),
    };

    callback(null, response);
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
    callback(null, response);
  }
};

module.exports = {
  create,
  get,
  update,
  deleteUser,
};
