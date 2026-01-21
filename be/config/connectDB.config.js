import sequelize from "./database.config.js";

const connectDB = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("PostgreSQL connected successfully");
    
    // Sync database models (create tables automatically)
    await sequelize.sync({ alter: true });
    console.log("Database synchronized");
    
  } catch (error) {
    console.error("Unable to connect to PostgreSQL:", error.message);
    process.exit(1);
  }
};

export default connectDB;