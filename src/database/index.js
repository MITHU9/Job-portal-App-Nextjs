import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://kmmithu2015:mithu200110@cluster0.gjjh7.mongodb.net/";

  mongoose
    .connect(connectionUrl)
    .then(() => {
      console.log("Connected to MongoDB!");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB:", err);
    });
};

export default connectToDB;
