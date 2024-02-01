import { ObjectId } from "mongodb";
import { Contest } from "../../../models/contest.js";

export default async (req, res) => {
  const { id } = req.query;
console.log("query is", req.query);
  try {
    console.log("params", req.params);
    const {contestId} = req.params;
    console.log("params", contestId);
    const contestData = await Contest.findOne({
        _id: new ObjectId(contestId),
      });

    res.json({
      code: "200",
      contest:contestData,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};