import express from "express";
const router = express.Router();
import axios from "axios";
import { verifyJwtToken } from "../middleware/verify_jwt_token.js";

let cf_problems, cf_problem_stats, cf_contests, cf_gym_contests;
const baseURL = " https://codeforces.com/api";

const cfapi = axios.create({
  baseURL,
});

const get_color = (rating) => {
  "Returns the HEX of appropriate color according to the rating.";
  let col = "#fff";
  if (rating <= 1199) col = "#cec8c1";
  else if (1199 < rating <= 1399) col = "#43A217";
  else if (1399 < rating <= 1599) col = "#22C4AE";
  else if (1599 < rating <= 1899) col = "#1427B2";
  else if (1899 < rating <= 2099) col = "#700CB0";
  else if (2099 < rating <= 2299) col = "#F9A908";
  else if (2299 < rating <= 2399) col = "#FBB948";
  else col = "#FF0000";
  return col;
};

const initCF = async () => {
  try {
    const response = await cfapi.get("/problemset.problems");
    cf_problems = response.data.result.problems;
    cf_problem_stats = response.data.result.problemStatistics;
    console.log("cf problems data fetched");
  } catch (error) {
    console.log("error fetching cf problems", error);
  }

  try {
    const response = await cfapi.get("/contest.list?gym=false");
    cf_contests = response.data.result;
    console.log("cf contests data fetched");
  } catch (error) {
    console.log("error fetching contests", error);
  }

  try {
    const response = await cfapi.get("/contest.list?gym=true");
    cf_gym_contests = response.data.result;
    console.log("cf gym contests data fetched");
  } catch (error) {
    console.log("error fetching gym contests", error);
  }
};

router.get("/problems", async (req, res) => {
  let { tags, from, to } = req.query;
  if (!from) from = 0;
  if (!to) to = 4000;
  from = parseInt(from);
  to = parseInt(to);
  if (typeof tags === "string") {
    tags = [tags];
  }
  var combineByOr = false;
  if (tags && tags.length > 0)
    combineByOr = tags.includes("combine-tags-by-or");
  try {
    const problems = cf_problems.filter((problem) => {
      if (combineByOr) {
        for (let i in tags) {
          if (
            problem.tags.includes(tags[i]) &&
            problem.rating >= from &&
            problem.rating <= to
          ) {
            return true;
          }
        }
        return false;
      } else {
        for (let i in tags) {
          if (
            problem.tags.includes(tags[i]) &&
            problem.rating >= from &&
            problem.rating <= to
          ) {
          } else {
            return false;
          }
        }
        return true;
      }
    });

    return res
      .status(200)
      .json({ message: "problems fetched successfully", data: problems });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching problems" });
  }
});

router.get("/contests", async (req, res) => {
  let { contestType } = req.query;
  try {
    let contests;
    if (contestType === "All contests") {
      contests = cf_contests;
    } else if (contestType === "Gym") {
      contests = cf_gym_contests;
    } else if (contestType == "Div. 1" || contestType == "Div. 2") {
      contests = cf_contests.filter((contest) => {
        return (
          contest.name.includes(contestType) &&
          !contest.name.includes("Educational") &&
          !contest.name.includes("Div. 1 + Div. 2")
        );
      });
    } else {
      contests = cf_contests.filter((contest) => {
        return contest.name.includes(contestType);
      });
    }
    return res
      .status(200)
      .json({ message: "contests fetched successfully", data: contests });
  } catch (error) {
    console.log("error sending contests data \n", error);
    return res.status(500).json({ message: "Error fetching contests" });
  }
});

router.get("/contest/problems", async (req, res) => {
  let { contestId, cf_username } = req.query;
  // console.log(req.query)
  cf_username = "voyager_08";
  try {
    // console.log(`/contest.standings?contestId=${contestId}&from=1&count=1`);
    const response = await cfapi.get(
      `/contest.standings?contestId=${contestId}&from=1&count=1`
    );
    const contest_problems = response.data.result.problems;
    // console.log("fetched problems ", req.query, response.data.result.problems);
    let final_verdicts = new Map();
    contest_problems.forEach((problem) => {
      final_verdicts[problem.index] = "unattempted";
    });
    // console.log("cf username after p fetched ", cf_username, contestId)
    if (cf_username) {
      //   console.log("fetching verdicts", `/contest.status?handle=${cf_username}&contestId=${contestId}&from=1&count=1000`);
      const response = await cfapi.get(
        `/contest.status?handle=${cf_username}&contestId=${contestId}&from=1&count=1000`
      );
      //   console.log("fetched response ", response.data);
      const submissions = response.data.result;
      //   console.log(response.data.result)
      submissions.forEach((submission) => {
        if (submission.verdict === "OK") {
          final_verdicts[submission.problem.index] = "accepted";
        } else if (final_verdicts[submission.problem.index] == "unattempted") {
          final_verdicts[submission.problem.index] = "wrong answer";
        }
      });
    }

    //    console.log("data returned")
    return res.status(200).json({
      message: "problems fetched successfully",
      data: { problems: contest_problems, verdicts: final_verdicts },
    });
  } catch (error) {
    // console.log("error sending contest problem data \n");
    return res.status(500).json({ message: "Error fetching contest problems" });
  }
});

router.get("/problems/unsolved", verifyJwtToken, async (req, res) => {
  const username = req.user;
  try {
    return res.status(200).json({
      message: "unsolved problems fetched successfully",
      data: contests,
    });
  } catch (error) {
    console.log("error fetching problems data \n", error);
    return res.status(500).json({ message: "Error fetching problems" });
  }
});

export default router;

export { initCF };
