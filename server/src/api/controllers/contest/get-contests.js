import { ObjectId } from "mongodb";
import { ContestTeamMapping } from "../../../models/contest-team-mapping.js";
import { Match } from "../../../models/index.js";
import { getText } from "../../../utils/index.js";
import { Contest } from "../../../models/contest.js";

export default async (req, res) => {
  const userId = req.params.userId;

  try {
    const contests = await ContestTeamMapping.find({ "teams.user_id": userId });
    const contestsWithMatchData = await Promise.all(
      contests.map(async (contest) => {
        const matchId = contest.match_id;
        const matchData = await fetchMatchData(matchId);
        const { price, totalSpots } = await fetchContestData(
          contest.contest_id
        );

        return {
          ...contest.toObject(),
          matchData,
          contestData: { price, totalSpots },
        };
      })
    );
    return res.status(200).json({
      resultMessage: { en: getText("en", "00095") },
      code: "00095",
      contests: contestsWithMatchData,
    });
  } catch (error) {
    console.error("Error creating teams:", error);
  }
};
async function fetchMatchData(matchId) {
  if (!matchId) return {};
  const matchData = await Match.findOne({ match_id: Number(matchId) });
  return matchData;
}
async function fetchContestData(contestId) {
  if (!contestId) return {};
  const contestData = await Contest.findOne({
    _id: new ObjectId(contestId),
  });
  return contestData;
}

/**
 * @swagger
 * /user:
 *    get:
 *      summary: Get User Info
 *      parameters:
 *        - in: header
 *          name: Authorization
 *          schema:
 *            type: string
 *          description: Put access token here
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: The user information has gotten successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          code:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *        "401":
 *          description: Invalid token.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
