import { ContestTeamMapping } from "../../../models/contest-team-mapping.js";
import { getText } from "../../../utils/index.js";

export default async (req, res) => {
  const payload = req.body;
  const {
    contestId: contest_id,
    userId: user_id,
    teamId: team_id,
    matchId: match_id,
    teams,
  } = payload;

  try {
    // Create an array of Player instances
    // const playerInstances = players.map(
    //   (playerData) => new Player(playerData)
    // );

    const contestInstance = new ContestTeamMapping({
      teams: teams,
      // Include other fields from the payload if needed
      match_id,
      team_id,
      contest_id,
      user_id,
    });

    const savedContest = await contestInstance.save();
    console.log("Contest saved to the database:", savedContest);

    return res.status(200).json({
      resultMessage: { en: getText("en", "00093") },
      code: "00093",
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
