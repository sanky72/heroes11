import mongoose from "mongoose";
const { Schema, model } = mongoose;

const playerSchema = new Schema({
  match_id: Number,
  team_id: Number,
  team_name: String,
  profile_photo: String,
  player_id: Number,
  isCaptain: Boolean,
  isWicketKeeper: Number,
  isSubstitute: Number,
  is_playing_squad: Number,
  player_name: String,
  is_player_pro: Number,
  association_tag: String,
  playing_role: String,
  is_follow: Number,
  batter_category: String,
  batter_category_info: String,
  bowler_category: String,
  bowler_category_info: String,
  isHome: Boolean,
  code: Number,
  isSelected: Boolean,
  isViceCaptain: Boolean,
});

const teamSchema = new Schema(
  {
    players: [playerSchema],
    match_id: Number,
    team_name: String,
    user_id: String,
    captain_id: Number,
    vice_captain_id: Number,

    // Other fields related to the team if any
  },
  { timestamps: true }
);

// const matchSchema = new Schema({
//   match_id: Number,
//   team_id: Number,
//   team_name: String,
//   // Other fields related to the match if any
// });

// Create Mongoose models
const PlayerModel = model("PlayerModel", playerSchema);
// const MatchModel = model("MatchModel", matchSchema);
const TeamModel = model("TeamModel", teamSchema);

export { PlayerModel, TeamModel };
