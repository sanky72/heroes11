import { ObjectId } from "mongodb";
import { Contest } from "../../../models/contest.js";

export default async (req, res) => {
  try {
    const { contestId } = req.params;
    console.log("params", contestId);
    const contestData = await Contest.find();
    res.json({
      code: "200",
      contests: contestData,
    });
  } catch (error) {
    console.error("Error fetching contests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
