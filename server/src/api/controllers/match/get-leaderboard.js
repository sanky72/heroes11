import { ContestTeamMapping } from "../../../models/contest-team-mapping.js";

export default async (req, res) => {
  const { match_id, contest_id } = req.query;
  console.log("query is", req.query);
  try {
    console.log("params", req.params);
    const { contestId } = req.params;
    console.log("params", contestId);
    const contestData = await ContestTeamMapping.findOne({
      match_id,
      contest_id,
    });

    res.json({
      code: "200",
      contest: contestData,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
