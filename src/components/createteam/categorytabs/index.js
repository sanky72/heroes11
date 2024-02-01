import styled from "@emotion/styled";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ProfilePic } from "../../../shared/components/ProfilePic";
import { checkAllRounder, checkWicketKeeper } from "../../../utils/img_url";
import Loader from "../../loader";

const Contest = styled.div`
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
  .MuiTabs-flexContainer {
    justify-content: space-between !important;
  }
`;

const PlayersList = styled.div`
  padding: 0 0;
`;

const EachPlayer = styled.div`
  cursor: pointer;
  img {
    width: 60px !important;
    border-radius: 50%;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 18px;
    font-family: "Open Sans";
    font-weight: bold;
    text-transform: capitalize;
  }
  border-bottom: 1px solid #e7e7e7;
  border-left: none;
  border-right: none;
  padding: 0px 0;
  min-height: 70px;
`;

const AddButton = styled.button`
  color: var(--green);
  background-color: #fff;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const RemoveButton = styled.button`
  color: #df5f1f;
  background-color: #fef4de;
  border: none;
  outline: none;
  margin-right: 15px;
  cursor: pointer;
`;

const NoLineups = styled.h3`
  color: var(--red);
  padding: 0 10px;
  text-align: center;
  height: 100px;
  margin-top: 15px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  p {
    margin-top: 5px;
    font-size: 10px;
    color: #060667;
  }
  align-items: flex-start;
  justify-content: center;
  width: 150px;
  h1 {
    font-size: 14px !important;
    line-height: 1;
  }
`;

const BlueDot = styled.span`
  background-color: #060667 !important;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 5px;
  display: inline-block;
`;

const Points = styled.h5`
  font-size: 14px;
  font-weight: 600;
`;

const ImgContainer = styled.div`
  padding-top: 10px;
  img {
    display: block;
  }
`;

const ImgCtr = styled.div`
  position: relative;
  text-transform: uppercase;
  padding-top: 10px;
  img {
    display: block;
  }
`;
const Home = styled.div`
  position: absolute;
  bottom: 2px;
  left: 2px;
  background-color: #fafafa;
  color: var(--black);
  height: 10px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 3px;
`;
const Away = styled.div`
  background-color: var(--black);
  color: var(--white);
  position: absolute;
  bottom: 2px;
  left: 2px;
  height: 10px;
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  border-radius: 3px;
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function CategoryTabs({
  id,
  players,
  match,
  matchId,
  setPlayers,
  lmPlayers,
  loading,
}) {
  console.log(match);
  const [value, setValue] = React.useState(1);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [team, setTeam] = React.useState(null);
  const [contest, setContest] = React.useState([]);
  const [modal, setModal] = React.useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function getplayers() {
      if (user?._id) {
        // const teamData = await API.get(
        //   `${URL}/user/teams?matchId=${matchId}&userId=${user._id}`
        // );
        // setTeam(teamData.data.teams);
        // const contestdata = await axios.get(
        //   `${URL}/getcontestsofuser/${id}?userId=${user._id}`
        // );
        // setContest(contestdata.data.contests);
      }
    }
    getplayers();
  }, [user]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleOpen = (i) => {
    setModal(i);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = (i) => {
    if (
      !players.find((p) => p.player_id == i).isSelected &&
      players.filter((p) => p.isSelected).length >= 11
    )
      return;
    const po = players.map((p) => {
      if (p.player_id === i) {
        p.isSelected = !p.isSelected;
      }
      return p;
    });
    setPlayers([...po]);
  };

  return (
    <Contest>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={`WK(${
                players.filter(
                  (p) => checkWicketKeeper(p.playing_role) && p.isSelected
                ).length
              })`}
              {...a11yProps(0)}
            />
            <Tab
              label={`BAT(${
                players.filter((p) => p.playing_role === "BAT" && p.isSelected)
                  .length
              })`}
              {...a11yProps(1)}
            />
            <Tab
              label={`AR(${
                players.filter(
                  (p) => checkAllRounder(p.playing_role) && p.isSelected
                ).length
              })`}
              {...a11yProps(2)}
            />
            <Tab
              label={`BOWL(${
                players.filter((p) => p.playing_role === "BOWL" && p.isSelected)
                  .length
              })`}
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        {!loading ? (
          <>
            <TabPanel value={value} index={0}>
              <PlayersList>
                <>
                  {players.filter((p, index) =>
                    checkWicketKeeper(p.playing_role)
                  ).length > 0 ? (
                    players
                      .filter((p, index) => checkWicketKeeper(p.playing_role))
                      .map((p) => (
                        <EachPlayer
                          onClick={() => handleClick(p.player_id)}
                          className={p.isSelected ? "selected" : "notselected"}
                        >
                          <ImgCtr>
                            <ProfilePic pic={p.profile_photo} />
                          </ImgCtr>
                          <Center>
                            <div className="player-team-container">
                              <h1>{p.player_name}</h1>
                              <span>{p.team_name}</span>
                            </div>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton
                              onClick={() => handleRemove(p.player_id)}
                            >
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p.player_id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? "disabled"
                                  : "notdisabled"
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>No Wicketkeeper</NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <PlayersList>
                <>
                  {players.length > 0 ? (
                    players
                      .filter((p, index) => p.playing_role === "BAT")
                      .map((p) => (
                        <EachPlayer
                          onClick={() => handleClick(p.player_id)}
                          className={p.isSelected ? "selected" : "notselected"}
                        >
                          <ImgCtr>
                            <ProfilePic pic={p.profile_photo} />
                          </ImgCtr>
                          <Center>
                            <div className="player-team-container">
                              <h1>{p.player_name}</h1>
                              <span>{p.team_name}</span>
                            </div>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton
                              onClick={() => handleRemove(p.player_id)}
                            >
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p.player_id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? "disabled"
                                  : "notdisabled"
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <PlayersList>
                <>
                  {players.length > 0 ? (
                    players
                      .filter((p) => checkAllRounder(p.playing_role))
                      .map((p) => (
                        <EachPlayer
                          onClick={() => handleClick(p.player_id)}
                          className={p.isSelected ? "selected" : "notselected"}
                        >
                          <ImgCtr>
                            <ProfilePic pic={p.profile_photo} />{" "}
                          </ImgCtr>
                          <Center>
                            <div className="player-team-container">
                              <h1>{p.player_name}</h1>
                              <span>{p.team_name}</span>
                            </div>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton
                              onClick={() => handleRemove(p.player_id)}
                            >
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p.player_id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? "disabled"
                                  : "notdisabled"
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <PlayersList>
                <>
                  {players.length > 0 ? (
                    players
                      .filter((p) => p.playing_role === "BOWL")
                      .map((p) => (
                        <EachPlayer
                          onClick={() => handleClick(p.player_id)}
                          className={p.isSelected ? "selected" : "notselected"}
                        >
                          <ImgCtr>
                            <ProfilePic pic={p.profile_photo} />
                          </ImgCtr>
                          <Center>
                            <div className="player-team-container">
                              <h1>{p.player_name}</h1>
                              <span>{p.team_name}</span>
                            </div>
                          </Center>
                          <Points>9.0</Points>
                          {p.isSelected ? (
                            <RemoveButton
                              onClick={() => handleRemove(p.player_id)}
                            >
                              <RemoveCircleOutlineRoundedIcon />
                            </RemoveButton>
                          ) : (
                            <AddButton
                              onClick={() => handleClick(p.player_id)}
                              disabled={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                              }
                              className={
                                players.filter((k) => k.isSelected === true)
                                  .length >= 11
                                  ? "disabled"
                                  : "notdisabled"
                              }
                            >
                              <AddCircleOutlineRoundedIcon />
                            </AddButton>
                          )}
                        </EachPlayer>
                      ))
                  ) : (
                    <NoLineups>
                      Lineups not out yet,check 30 minutes before the game
                    </NoLineups>
                  )}
                </>
              </PlayersList>
            </TabPanel>
          </>
        ) : (
          <Loader />
        )}
      </Box>
    </Contest>
  );
}
