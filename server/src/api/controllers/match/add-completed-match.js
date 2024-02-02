import CompletedMatches from "../../../models/completed.js";
import { Match } from "../../../models/index.js";
import { getText } from "../../../utils/index.js";

export default async (req, res) => {
  const payload = req.body;
  try {
    await CompletedMatches.create({ data: payload });
    console.log("Contests saved successfully");

    return res.status(200).json({
      resultMessage: { en: getText("en", "00095") },
      code: "00095",
    });
  } catch (error) {
    console.error("Error creating completed contest:", error);
  }
};
