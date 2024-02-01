import { Schema, model } from "mongoose";

// Innings schema
const inningSchema = new Schema({
  batting_team: {
    type: String,
    required: false,
  },
  runs: {
    type: Number,
    required: false,
  },
  wickets: {
    type: Number,
    required: false,
  },
  overs: {
    type: Number,
    required: false,
  },
});

// Match schema
const matchSchema = new Schema({
  match_id: {
    type: Number,
    required: true,
  },
  match_type: {
    type: String,
    required: true,
  },
  is_super_over: {
    type: Number,
    required: true,
  },
  match_event_type: String,
  match_event: String,
  match_inning: {
    type: Number,
    required: true,
  },
  ball_type: String,
  current_inning: {
    type: Number,
    required: true,
  },
  match_start_time: {
    type: Date,
    required: true,
  },
  match_end_time: Date,
  city_id: {
    type: Number,
    required: true,
  },
  city_name: String,
  ground_id: {
    type: Number,
    required: true,
  },
  ground_name: String,
  overs: {
    type: Number,
    required: true,
  },
  balls: Number,
  over_reduce: String,
  is_dl: {
    type: Number,
    required: true,
  },
  is_vjd: {
    type: Number,
    required: true,
  },
  winning_team_id: String,
  winning_team: String,
  match_result: String,
  win_by: String,
  team_a_id: {
    type: Number,
    required: true,
  },
  team_a: String,
  team_a_logo: String,
  is_a_home_team: {
    type: Number,
    required: true,
  },
  team_b_id: {
    type: Number,
    required: true,
  },
  team_b: String,
  team_b_logo: String,
  is_b_home_team: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  tournament_id: String,
  tournament_name: String,
  tournament_round_id: String,
  tournament_round_name: String,
  is_watch_live: {
    type: Number,
    required: true,
  },
  is_in_review: {
    type: Number,
    required: true,
  },
  match_category_name: String,
  index: {
    type: Number,
    required: true,
  },
  match_summary: {
    team_id: {
      type: Number,
      required: true,
    },
    summary: String,
    short_summary: String,
    full_summary: String,
    rrr: String,
    target: String,
  },
  team_a_summary: String,
  team_a_innings: [inningSchema],
  team_b_summary: String,
  team_b_innings: [inningSchema],
  toss_details: String,
});

const Match = model("Match", matchSchema);
export default Match;
