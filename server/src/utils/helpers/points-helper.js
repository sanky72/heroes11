const axios = require("axios");

// Dream11 T20 Points System
const T20_points = {
  announced: 4,
  run: 1,
  boundary_bonus: 1,
  six_bonus: 2,
  "30_run_bonus": 4,
  half_century_bonus: 8,
  century_bonus: 16,
  dismissal_for_duck: -2,
  wicket: 25,
  "lbw/bowled_bonus": 8,
  "3_wicket_haul": 4,
  "4_wicket_haul": 8,
  "5_wicket_haul": 16,
  maiden: 12,
  catch: 8,
  "3_catch_bonus": 4,
  "runout(DirectHit/Stumping)": 12,
  "runout(Catcher/Thrower)": 6,
  min_overs_to_be_bowled_for_economy_points: 2,
  economy_points: {
    "<5": 6,
    ">=5 and <=5.99": 4,
    ">=6 and <=7": 2,
    ">=10 and <=11": -2,
    ">=11.01 and <=12": -4,
    ">12": -6,
  },
  min_balls_to_be_played_for_strikerate_points: 10,
  strike_rate_points: {
    ">170": 6,
    ">=150.01 and <=170": 4,
    ">=130 and <=150": 2,
    ">=60 and <=70": -2,
    ">=50 and <=59.99": -4,
    "<50": -6,
  },
};

const ODI_points = {
  announced: 4,
  run: 1,
  boundary_bonus: 1,
  six_bonus: 2,
  half_century_bonus: 4,
  century_bonus: 8,
  dismissal_for_duck: -3,
  wicket: 25,
  "lbw/bowled_bonus": 8,
  "4_wicket_haul": 4,
  "5_wicket_haul": 8,
  maiden: 4,
  catch: 8,
  "3_catch_bonus": 4,
  "runout(DirectHit/Stumping)": 12,
  "runout(Catcher/Thrower)": 6,
  min_overs_to_be_bowled_for_economy_points: 5,
  economy_points: {
    "<2.5": 6,
    ">=2.5 and <=3.49": 4,
    ">=3.5 and <=4.5": 2,
    ">=7 and <=8": -2,
    ">=8.01 and <=9": -4,
    ">9": -6,
  },
  min_balls_to_be_played_for_strikerate_points: 20,
  strike_rate_points: {
    ">140": 6,
    ">=120.01 and <=140": 4,
    ">=100 and <=120": 2,
    ">=40 and <=50": -2,
    ">=30 and <=39.99": -4,
    "<30": -6,
  },
};
function calculatePoints(playerStats, pointsSystem) {
  const playerList = [];

  for (const [player, stats] of Object.entries(playerStats)) {
    let points = 0;

    // Add points based on the provided pointsSystem
    points += pointsSystem.announced;
    points += stats["Runs Scored"] * pointsSystem.run;
    points += stats.Fours * pointsSystem.boundary_bonus;
    points += stats.Sixes * pointsSystem.six_bonus;

    if (stats["Runs Scored"] >= 100) {
      points += pointsSystem.century_bonus;
    } else if (stats["Runs Scored"] >= 50) {
      points += pointsSystem.half_century_bonus;
    } else if (stats["Runs Scored"] >= 30) {
      points += pointsSystem["30_run_bonus"];
    }

    if (
      stats.Dismissal !== "Did Not Bat" &&
      stats.Dismissal !== "not out" &&
      stats["Runs Scored"] === 0
    ) {
      points += pointsSystem.dismissal_for_duck;
    }

    points += stats.Wickets * pointsSystem.wicket;
    points += stats["LBW/Bowled Wickets"] * pointsSystem["lbw/bowled_bonus"];

    if (stats.Wickets >= 5) {
      points += pointsSystem["5_wicket_haul"];
    } else if (stats.Wickets === 4) {
      points += pointsSystem["4_wicket_haul"];
    } else if (stats.Wickets === 3) {
      points += pointsSystem["3_wicket_haul"];
    }

    points += stats.Maidens * pointsSystem.maiden;
    points += stats.Catches * pointsSystem.catch;

    if (stats.Catches >= 3) {
      points += pointsSystem["3_catch_bonus"];
    }

    points +=
      stats["Direct Throw Runout"] * pointsSystem["runout(DirectHit/Stumping)"];
    points +=
      stats["Runout involving Thrower and Catcher"] *
      pointsSystem["runout(Catcher/Thrower)"];

    if (
      stats["Overs Bowled"] >=
      pointsSystem.min_overs_to_be_bowled_for_economy_points
    ) {
      const eco = stats.Economy;
      for (const [range, value] of Object.entries(
        pointsSystem.economy_points
      )) {
        const [min, max] = range.split(" and ");
        if (max) {
          if (eval(`${eco} >= ${min} && ${eco} <= ${max}`)) {
            points += value;
            break;
          }
        } else {
          if (eval(`${eco} ${min}`)) {
            points += value;
            break;
          }
        }
      }
    }

    if (
      stats["Balls Faced"] >=
      pointsSystem.min_balls_to_be_played_for_strikerate_points
    ) {
      const strRate = stats["Strike Rate"];
      for (const [range, value] of Object.entries(
        pointsSystem.strike_rate_points
      )) {
        const [min, max] = range.split(" and ");
        if (max) {
          if (eval(`${strRate} >= ${min} && ${strRate} <= ${max}`)) {
            points += value;
            break;
          }
        } else {
          if (eval(`${strRate} ${min}`)) {
            points += value;
            break;
          }
        }
      }
    }

    playerList.push([player, points]);
  }

  // Sort the playerList based on points (you may want to adjust this based on your sorting criteria)
  playerList.sort((a, b) => b[1] - a[1]);

  return playerList;
}

// Main function
async function main(playerStats, type) {
  try {
    let playerList;
    if (type === 1) {
      playerList = calculatePoints(playerStats, T20_points);
    } else if (type === 2) {
      playerList = calculatePoints(playerStats, ODI_points);
    }

    const colWidth =
      Math.max(...playerList.flat().map((word) => String(word).length)) + 2; // padding
    for (const row of playerList) {
      console.log(row.map((word) => String(word).padEnd(colWidth)).join(""));
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

// Helper function to get user input
function getUserInput() {
  return new Promise((resolve) => {
    process.stdin.once("data", (data) => {
      resolve(data.toString().trim());
    });
  });
}

// Run the main function
main();
