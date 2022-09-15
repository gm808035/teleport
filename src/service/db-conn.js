const { Sequelize } = require("sequelize");

const connect = async () => {
  const sequelize = new Sequelize("teleport", "wildmint", "pass", {
    host: "localhost",
    dialect: "postgres",
    port: 5432,
    pool: {
      max: 10,
      idle: 30000,
    },
  });

  try {
    await sequelize.authenticate();
    console.log("Connected...");
    await sequelize.sync({ force: true });
    return sequelize;
    
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// connect();

module.exports = {
  connect,
};
