import CompletedMatches from "../../../models/completed.js";
import { Team } from "../../../models/index.js";

export default async (req, res) => {
  try {
    const matches = await CompletedMatches.find();

    res.json({
      code: "200",
      matches,
    });
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
