import { Player, Team } from "../../../models/index.js";
import { getText } from "../../../utils/index.js";

export default async (req, res) => {
  try {
    const { captainId, viceCaptainId, userId, matchId, players } = req.body;

    const playerInstances = players.map((playerData) => new Player(playerData));

    await Team.updateOne(
      { match_id: matchId, user_id: userId },
      {
        $set: {
          players: playerInstances,
          match_id: matchId,
          captain_id: captainId,
          vice_captain_id: viceCaptainId,
          user_id: userId,
        },
      }
    ).catch((err) => {
      return res.status(500).json(errorHelper("00064", req, err.message));
    });

    return res.status(200).json({
      resultMessage: { en: getText("en", "00065"), tr: getText("tr", "00065") },
      code: "00065",
    });
  } catch (err) {
    return res.status(500).json(errorHelper("00064", req, err.message));
  }
};
/**
 * @swagger
 /api/updateTeam:
    post:
      summary: Update Team
      description: Update the team in the database.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                captainId:
                  type: string
                viceCaptainId:
                  type: string
                userId:
                  type: string
                matchId:
                  type: string
                players:
                  type: array
                  items:
                    type: object
                    # Define your player schema here

      responses:
        '200':
          description: Team updated successfully
          content:
            application/json:
              example:
                resultMessage:
                  en: Team updated successfully
                  tr: Team başarıyla güncellendi
                code: '00065'

        '404':
          description: Team not found
          content:
            application/json:
              example:
                resultMessage:
                  en: Team not found
                  tr: Team bulunamadı
                code: '00066'

        '500':
          description: Internal Server Error
          content:
            application/json:
              example:
                resultMessage:
                  en: Internal Server Error
                  tr: İç Sunucu Hatası
                code: '00064'
                */
