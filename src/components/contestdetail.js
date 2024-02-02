import "./create.css";
import "./home.css";

import styled from "@emotion/styled";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import WestIcon from "@mui/icons-material/West";
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { URL } from "../constants/userConstants";
import ContestTabs from "./ContestTabs";
import Contest from "./contests/contest";
import { API } from "../actions/userAction";
import { useSelector } from "react-redux";

const Top = styled.div`
  background-color: var(--black);
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 550px;
  position: fixed;
  height: 50px;
  top: 0;
  left: 0;
  padding: 15px 20px;
  box-sizing: border-box;
`;

const Bottom = styled.div``;
const LeftSide = styled.div`
  /* width: 150px; */
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
`;

const RightSide = styled.div`
  width: 190px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Container = styled.div`
  .MuiTabs-indicator {
    background-color: var(--red) !important;
    padding: 1px 0;
  }
  .Mui-selected {
    color: var(--black) !important;
    text-transform: capitalize;
    font-weight: 600;
  }
  .MuiTab-root {
    text-transform: capitalize;
    font-family: "Open Sans";
  }
`;
const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0 0;
  margin-top: 70px !important;
  cursor: pointer;
`;

const tabs = [{ label: "winnings" }, { label: "leaderboard" }];

export function ContestDetail() {
  const { state } = useLocation();
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [match, setMatch] = useState(null);
  const [contest, setContest] = useState(null);
  const { user } = useSelector((state) => state.user);
  const { id, matchId } = useParams();
  const history = useNavigate();

  useEffect(() => {
    async function getteams() {
      if (id.length > 3) {
        const contestdata = await API.get(`${URL}/match/contest/prizes/${id}`);
        const teamdata = await API.get(
          `${URL}/match/leaderboard?contest_id=${id}&match_id=${matchId}`
        );
        console.log("aekfbj", teamdata);
        setContest(contestdata.data.contest);
        // setMatch(teamdata.data.match);
        const t = teamdata?.data?.contest?.teams.sort(
          (a, b) => a.points - b.points
        );
        setLeaderboard([...t]);
      }
    }
    getteams();
  }, [id]);
  console.log(state, "state");
  return (
    <>
      <ContestsContainer container>
        <Top>
          <LeftSide>
            <WestIcon
              onClick={() => history(-1)}
              style={{ cursor: "pointer" }}
            />
            {match && (
              <h1>
                <span style={{ marginRight: "5px" }}>{match.teamAwayCode}</span>
                vs
                <span style={{ marginLeft: "5px" }}>{match.teamHomeCode}</span>
              </h1>
            )}
          </LeftSide>
          <RightSide>
            <Brightness1Icon />
            <AccountBalanceWalletOutlinedIcon />
            <NotificationAddOutlinedIcon />
          </RightSide>
        </Top>
        {contest && <Contest contest={contest} />}
      </ContestsContainer>
      <ContestTabs
        contest={contest}
        leaderboard={leaderboard}
        match_details={state?.match_details}
      />
    </>
  );
}

export default ContestDetail;
