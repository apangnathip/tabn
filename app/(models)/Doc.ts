import mongoose, { Schema } from "mongoose";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  throw new Error("DB connection error");
}

mongoose.Promise = global.Promise;

const docSchema = new Schema(
  {
    title: String,
    offset: Number,
    notation: String,
  },
  {
    timestamps: true,
  },
);

export type DocJson = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  offset: string;
  notation: string;
};

const Doc = mongoose.models.Doc || mongoose.model("Doc", docSchema);
export default Doc;
