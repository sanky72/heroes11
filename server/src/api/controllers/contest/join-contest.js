import { ObjectId } from "mongodb";
import { ContestTeamMapping } from "../../../models/contest-team-mapping.js";
import { getText } from "../../../utils/index.js";
import { Contest } from "../../../models/contest.js";

export default async (req, res) => {
  const payload = req.body;
  const {
    contestId: contest_id,
    user_id,
    team_id,
    matchId: match_id,
    team,
  } = payload;

  try {
    // Create an array of Player instances
    // const playerInstances = players.map(
    //   (playerData) => new Player(playerData)
    // );

    // Check if the user_id exists in the collection
    const existingRecordUser = await ContestTeamMapping.findOne({
      "teams.user_id": user_id,
      match_id,
      contest_id,
    });
    if (existingRecordUser) {
      return res.status(200).json({
        resultMessage: { en: getText("en", "00096") },
        code: "00096",
      });
    }
    const contestData = await Contest.findOne({
      _id: new ObjectId(contest_id),
    });
    const existingRecord = await ContestTeamMapping.findOne({
      // "teams.user_id": user_id,
      match_id,
      contest_id,
    });

    if (!existingRecord) {
      const contestInstance = new ContestTeamMapping({
        teams: [team],
        // Include other fields from the payload if needed
        match_id,
        team_id,
        contest_id,
        user_id,
        totalSpots: contestData.totalSpots,
        spotsLeft: contestData.totalSpots - 1,
        price: contestData.price,
      });

      const savedContest = await contestInstance.save();
      console.log("Contest saved to the database:", savedContest);
    } else {
      await ContestTeamMapping.updateOne(
        { _id: existingRecord._id },
        {
          $push: {
            teams: team,
          },
          $inc: {
            spotsLeft: -1,
          },
        }
      );
    }
    return res.status(200).json({
      resultMessage: { en: getText("en", "00097") },
      code: "00097",
    });
  } catch (error) {
    console.error("Error creating Contests:", error);
  }
};

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
