import mongoose, { InferSchemaType, Schema, Types } from "mongoose";

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  throw new Error("DB connection error");
}

mongoose.Promise = global.Promise;

const docSchema = new Schema(
  {
    _id: Types.ObjectId,
    title: String,
    tags: [String],
  },
  {
    timestamps: true,
  },
);

export type DocType = InferSchemaType<typeof docSchema>;

const Doc = mongoose.models.Doc || mongoose.model<DocType>("Doc", docSchema);
export default Doc;
