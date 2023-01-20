import mongoose from "mongoose";
mongoose.set("strictQuery", false);

const connect = () => {
  mongoose.connect(process.env.MONGODB_URL);
};

export default { connect };
