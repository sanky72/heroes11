import "./create.css";
import "./home.css";

import { useEffect, useState } from "react";

import Team from "./Team";

export function TeamShort({ t, index }) {
  console.log(t);
  const {
    players,
    match_id: matchId,
    _id: teamId,
    captain_id: captainId,
    vice_captain_id: viceCaptainId,
  } = t;

  const [selectedPlayers, setSelectedPlayers] = useState(players);
  const [captain, setCaptain] = useState({});
  const [teamData, setTeamData] = useState();
  const [viceCaptain, setViceCaptain] = useState({});
  useEffect(() => {
    async function filterDifferent() {
      // const h = match.teamHomePlayers.filter((f) =>
      //   selectedPlayers.some((s) => f.player_id == s.player_id)
      // ).length;
      // const o = match.teamAwayPlayers.filter((f) =>
      //   selectedPlayers.some((s) => f.player_id == s.player_id)
      // ).length;
      // const a = [
      //   { awayCode: match_info.teamAwayCode, number: o },
      //   { homeCode: match_info.teamHomeCode, number: h },
      // ];
      const teamPlayersMap = players.reduce((acc, player) => {
        if (!acc[player.team_name]) {
          acc[player.team_name] = [];
        }
        acc[player.team_name].push(player);
        return acc;
      }, {});
      const teamData = Object.entries(teamPlayersMap).map(
        ([teamName, teamPlayers]) => ({
          teamName,
          teamLength: teamPlayers.length,
        })
      );
      console.log({ teamData });
      setTeamData(teamData);
      setCaptain(players.filter((player) => player.isCaptain)[0]);
      setViceCaptain(players.filter((player) => player.isViceCaptain)[0]);
    }
    filterDifferent();
  }, [selectedPlayers]);

  return (
    <div>
      {players ? (
        <Team
          teamData={teamData}
          captain={captain}
          viceCaptain={viceCaptain}
          selectedPlayers={selectedPlayers}
          matchId={matchId}
          teamId={teamId}
          index={index}
        />
      ) : (
        <h1>select team</h1>
      )}
    </div>
  );
}

export default TeamShort;
