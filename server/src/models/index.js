import logModel from "./log.js";
import MatchModel from "./match.js";
import { PlayerModel, TeamModel } from "./team.js";
import tokenModel from "./token.js";
import userModel from "./user.js";
import completedModel from "./completed.js";

export const User = userModel;
export const Team = TeamModel;
export const Match = MatchModel;
export const Completed = completedModel;
export const Player = PlayerModel;
export const Token = tokenModel;
export const Log = logModel;
