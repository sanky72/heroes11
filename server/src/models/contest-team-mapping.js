import mongoose from "mongoose";

const ContestTeamMappingSchema = new mongoose.Schema({
  match_id: {
    type: String,
    required: true,
  },
  teams: [
    {
      team_id: {
        type: String,
        required: true,
      },
      user_id: {
        type: String,
        required: true,
      },
      points: {
        type: Number,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      rank: {
        type: Number,
        required: true,
      },
    },
  ],

  contest_id: {
    type: String,
    required: true,
  },
});

export const ContestTeamMapping = mongoose.model(
  "ContestTeamMapping",
  ContestTeamMappingSchema
);
