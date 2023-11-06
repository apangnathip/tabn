import mongoose, { Schema } from "mongoose";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  throw new Error("DB connection error");
}

mongoose.Promise = global.Promise;

const tabSchema = new Schema(
  {
    title: String,
    tags: [String],
  },
  {
    timestamps: true,
  },
);

const Tab = mongoose.models.Tab || mongoose.model("Tab", tabSchema);
export default Tab;
