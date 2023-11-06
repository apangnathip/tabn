import mongoose, { InferSchemaType, Schema } from "mongoose";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  throw new Error("DB connection error");
}

mongoose.Promise = global.Promise;

const docSchema = new Schema(
  {
    title: String,
    tags: [String],
  },
  {
    timestamps: true,
  },
);

type DocType = InferSchemaType<typeof docSchema>;

const Doc = mongoose.models.Doc || mongoose.model<DocType>("Doc", docSchema);
export default Doc;
