import { Schema, model } from "mongoose";

const completedSchema = new Schema({
  data: {
    type: Schema.Types.Mixed,
    required: true,
  },
});
const CompletedMatches = model("CompletedMatches", completedSchema);
export default CompletedMatches;
