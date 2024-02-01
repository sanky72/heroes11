import { User } from "../../../models/index.js";
import { errorHelper, logger, getText } from "../../../utils/index.js";
import axios from "axios";

export default async (req, res) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://cricheroes.in/api/v1/match/get-my-web-matches?pagesize=12&tournamentid=-1&teamid=-1&cityid=-1&ball_type=-1&inning_type=-1",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      Connection: "keep-alive",
      "Content-Type": "application/json; charset=utf-8",
      Cookie:
        "_ga=GA1.1.771621765.1704503368; connect.sid=s%3AlIEcrlsn9fd3ZQBnmXwvJMdUxGbk-kmx.D6p%2FgqWikSjwYPWwxU9bOP7u4UUKtPbirmq3tvhAvHg; udid=ae9ffdf89a1597d99627b11e916d95e4; visitorId=ae9ffdf89a1597d99627b11e916d95e4; _gcl_au=1.1.853532985.1705415280; _clck=1iszalp%7C2%7Cfig%7C0%7C1466; Authorization=b6a8d8c0-b47b-11ee-a7de-17f79fae204b; current_user=%7B%22user_id%22%3A16097445%2C%22country_id%22%3A1%2C%22country_code%22%3A%22%2B91%22%2C%22mobile%22%3A%229467765170%22%2C%22name%22%3A%22Malkeet%22%2C%22email%22%3A%2212malkeet%40gmail.com%22%2C%22dob%22%3A%22%22%2C%22gender%22%3A0%2C%22city_id%22%3A1798%2C%22state_id%22%3A18%2C%22city_name%22%3A%22Bengaluru%20(Bangalore)%22%2C%22player_skill%22%3A%22%22%2C%22player_role%22%3A%22Opening%20batter%22%2C%22playing_role_id%22%3A%228%22%2C%22bowling_type%22%3A%22Right-arm%20medium%22%2C%22bowling_type_id%22%3A%224%22%2C%22bowling_type_code%22%3A%22RM%22%2C%22batting_hand%22%3A%22RHB%22%2C%22profile_photo%22%3A%22https%3A%2F%2Fmedia.cricheroes.in%2Fuser_profile%2F1699061854694_G9m7LlDImmtM.jpeg%22%2C%22is_verified%22%3A1%2C%22promo_code%22%3A%22JTMNY%22%2C%22counter%22%3A0%2C%22is_pro%22%3A0%2C%22is_primary_login%22%3A0%2C%22created_date%22%3A%222022-09-24T07%3A08%3A07.000Z%22%2C%22is_valid_device%22%3A1%2C%22can_switch_association%22%3A0%2C%22has_association_admin%22%3A0%2C%22association_id%22%3A0%2C%22is_web_insights_access%22%3A0%2C%22has_ticker_admin%22%3A0%2C%22only_ticker_admin%22%3A0%2C%22has_fantasy_admin%22%3A0%2C%22has_umpires_association_admin_access%22%3A0%2C%22has_umpires_association_umpire_access%22%3A0%7D; isAdmin=false; isWeb=true; _clsk=11ue06u%7C1705415395919%7C4%7C1%7Cx.clarity.ms%2Fcollect; _ga_RHRT76MSXD=GS1.1.1705415279.2.1.1705415421.17.0.0; browserId=ecabc5263d2bb2665c43d8de4d3c7b41; _bid=ecabc5263d2bb2665c43d8de4d3c7b41",
      "If-None-Match": 'W/"55c4-T9Rt8Es9FKPpPblPGmZUQw"',
      Referer: "https://cricheroes.in/my-matches",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
      "api-key": "cr!CkH3r0s",
      "device-type": "Chrome: 120.0.0.0",
      "sec-ch-ua":
        '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"macOS"',
      udid: "ae9ffdf89a1597d99627b11e916d95e4",
    },
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      return res.status(200).json({
        resultMessage: { en: getText("en", "00090") },
        code: "00090",
        data: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
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
