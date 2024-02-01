import "./home.css";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import styled from "@emotion/styled";
import { SportsCricketOutlined } from "@mui/icons-material";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../actions/userAction";
import placeholderImage from "../assets/abd.jpeg";
import { URL } from "../constants/userConstants";
import {
  getDisplayDate,
  hoursRemaining,
  isTommorrow,
  sameDayorNot,
} from "../utils/dateformat";
import Loader from "./loader";
import Navbar from "./navbar";
import Bottomnav from "./navbar/bottomnavbar";

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
  .MuiTabScrollButton-root {
    width: 15px;
    white-space: nowrap;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  color: #595959;
  align-items: center;
  border-bottom: 1px solid rgba(170, 170, 170, 0.15);
  padding: 5px 15px;
  background-color: #ffffff;
`;

const Dot = styled.div`
  background-color: var(--green) !important;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  margin-right: 5px;
`;
const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  height: 50vh;
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
        <Box sx={{ p: 1 }}>
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

export function Completed() {
  const [value, setValue] = React.useState(0);
  const { id } = useParams();
  const { user, isAuthenticated, error } = useSelector((state) => state.user);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [date, setDate] = useState();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const i = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, []);
  useEffect(() => {
    async function getupcoming() {
      if (user?._id) {
        setLoading(true);
        const data = await API.get(`${URL}/contest/${user._id}`);
        // const cm = data.data.completed.results.sort(
        //   (b, a) => new Date(a.date) - new Date(b.date)
        // );
        // const um = data.data.upcoming?.results.sort(
        //   (b, a) => new Date(a.date) - new Date(b.date)
        // );
        // const lm = data.data.upcoming?.results.sort(
        //   (b, a) => new Date(a.date) - new Date(b.date)
        // );
        // setPast(cm);
        // setUpcoming(um);
        const matchesObject = {};
        setUpcoming(data.data.contests);
        for (const contest of data.data.contests) {
          const matchId = contest.match_id;
          const {
            team_a,
            team_b,
            tournament_name,
            match_result,
            match_start_time,
          } = contest.matchData;

          // Check if the match_id exists in matchesObject
          if (!matchesObject[matchId]) {
            // If it doesn't exist, create a new match object with an array property for contests
            matchesObject[matchId] = {
              match_id: matchId,
              tournament_name,
              team_a,
              match_result,
              team_b,
              match_start_time,
              contest_id: contest.contest_id,
              price: contest.contestData.price,
              contests: [],
            };
          }

          // Add the current contest to the array inside the match object
          matchesObject[matchId].contests.push(contest);
        }

        // Convert the matchesObject values into an array
        const matchesArray = Object.values(matchesObject);
        console.log({ matchesArray });
        console.log({ matchesObject });
        setMatches(matchesArray);
        // setLive(data.data.contests);
        setLoading(false);
      }
    }
    getupcoming();
  }, [user]);
  useEffect(() => {
    const servertoken =
      localStorage.getItem("token") && localStorage.getItem("token");
    if (!servertoken) {
      navigate("/login");
    }
  }, []);
  const handleClick = () => {
    setOpen(true);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const renderEmptyState = () => {
    return (
      <EmptyStateContainer>
        <h3
          style={{
            marginTop: "20px",
          }}
        >
          You have not joined any matches yet
        </h3>
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h4>Go to Home</h4>
          <img
            style={{ height: "26vh", margin: "15px 0 20px 0" }}
            src={placeholderImage}
          />
          <h4>Checkout our match fixtures</h4>
        </p>
      </EmptyStateContainer>
    );
  };
  console.log(upcoming);
  return (
    <>
      <Navbar />
      {!loading ? (
        <Container>
          <div className="homecontainer">
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="scrollable"
                  scrollButtons
                  allowScrollButtonsMobile
                  aria-label="scrollable force tabs example"
                >
                  <Tab label="Upcoming" {...a11yProps(0)} />
                  <Tab label={`Live`} {...a11yProps(1)} />
                  <Tab label={`Completed`} {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="matches">
                  {matches?.length > 0 ? (
                    <>
                      {matches.map((u) => {
                        console.log(u);
                        return (
                          <div
                            className="matchcontainer"
                            onClick={() =>
                              navigate(`/contests/${u.match_id}`, {
                                state: {
                                  selectedTab: 1,
                                },
                              })
                            }
                            style={{
                              position: "absolute !important",
                              backgroundColor: "#000",
                            }}
                          >
                            <Top>
                              <h5
                                style={{
                                  color: "#595959",
                                  height: "3vh",
                                  fontSize: "12px",
                                  fontWeight: "800",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                {u.tournament_name}
                              </h5>
                              <NotificationAddOutlinedIcon
                                style={{ fontSize: "18px" }}
                              />
                            </Top>
                            <div className="match">
                              <div className="matchcenter">
                                <div className="matchlefts">
                                  {/* { <img
              src={u.teamAwayFlagUrl}
              alt=""
              width="40"
            /> } */}
                                  <h5>{u.team_a}</h5>
                                </div>
                                <div
                                  className={
                                    u.match_result ? "completed" : "time"
                                  }
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <p
                                      style={{
                                        color: "#5e5b5b",
                                        textTransform: "auto",
                                        fontSize: "10px",
                                        marginTop: "2px",
                                      }}
                                    >
                                      {!u.match_result ? (
                                        sameDayorNot(
                                          new Date(),
                                          new Date(u.match_start_time)
                                        ) ||
                                        isTommorrow(
                                          new Date(),
                                          new Date(u.match_start_time)
                                        ) ? (
                                          renderDate(u)
                                        ) : (
                                          <p
                                            style={{
                                              color: "#e10000",
                                              textTransform: "auto",
                                            }}
                                          >
                                            {getDisplayDate(
                                              u.match_start_time,
                                              "i"
                                            ) &&
                                              getDisplayDate(
                                                u.match_start_time,
                                                "i"
                                              )}
                                          </p>
                                        )
                                      ) : (
                                        "Completed"
                                      )}
                                    </p>
                                  </div>
                                </div>
                                <div className="matchrights">
                                  <h5>{u.team_b}</h5>
                                  {/* <img
              src={u.teamHomeFlagUrl}
              alt=""
              width="40"
            /> */}
                                </div>
                              </div>
                            </div>
                            <div
                              className="bottom"
                              style={{
                                position: "relative",
                                padding: "6px 15px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  width: "150px",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                }}
                              >
                                {u.contests.length > 0 && (
                                  <h5
                                    className=""
                                    style={{
                                      textTransform: "capitalize",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {u.contests.length}
                                    {u.contests.length == 1
                                      ? " Contest"
                                      : " Contests"}
                                  </h5>
                                )}
                              </div>
                              <div className="icon">
                                <SportsCricketOutlined
                                  style={{ color: "#595959", fontSize: "18px" }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    renderEmptyState()
                  )}
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                {renderEmptyState()}
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="matches">
                  {past?.length > 0 ? (
                    <>
                      {past.map((u) => (
                        <div
                          className="matchcontainer"
                          onClick={() => navigate(`/contests/${u.match_id}`)}
                          style={{
                            position: "absolute !important",
                            backgroundColor: "#000",
                          }}
                        >
                          <Top>
                            <h5
                              style={{
                                color: "#595959",
                                height: "3vh",
                                fontSize: "12px",
                                fontWeight: "800",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <span style={{ marginRight: "5px" }}>
                                {/* {u.away.code} */}
                              </span>{" "}
                              vs
                              <span style={{ marginLeft: "5px" }}>
                                {/* {u.home.code} */}
                              </span>
                            </h5>
                            <NotificationAddOutlinedIcon
                              style={{ fontSize: "18px" }}
                            />
                          </Top>
                          <div className="match">
                            <div className="matchcenter">
                              <div className="matchlefts">
                                <img
                                  src={u.teamAwayFlagUrl}
                                  alt=""
                                  width="40"
                                />
                                {/* <h5>{u.away.code}</h5> */}
                              </div>
                              <div
                                className={
                                  u.match_result ? "completed" : "time"
                                }
                              >
                                {u.result === "Yes" && (
                                  <div
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      flexDirection: "column",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        alignItems: "center",
                                        textTransform: "uppercase",
                                      }}
                                    >
                                      <Dot />
                                      <h5
                                        style={{ fontWeight: "600 !important" }}
                                      >
                                        Completed
                                      </h5>
                                    </div>
                                    <p
                                      style={{
                                        color: "#5e5b5b",
                                        textTransform: "auto",
                                        fontSize: "10px",
                                        marginTop: "2px",
                                      }}
                                    >
                                      {getDisplayDate(
                                        u.match_start_time,
                                        "i",
                                        date
                                      )}
                                    </p>
                                  </div>
                                )}
                              </div>
                              <div className="matchrights">
                                {/* <h5> {u.home.code}</h5> */}
                                <img
                                  src={u.teamHomeFlagUrl}
                                  alt=""
                                  width="40"
                                />
                              </div>
                            </div>
                          </div>
                          <div
                            className="bottom"
                            style={{
                              position: "relative",
                              padding: "6px 15px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                width: "150px",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              {u.contests.length > 0 && (
                                <h5
                                  className=""
                                  style={{
                                    textTransform: "capitalize",
                                    fontSize: "12px",
                                  }}
                                >
                                  {u.contests.length} contests
                                </h5>
                              )}
                              <div className="meg">
                                {u.contests.length > 0 && (
                                  <h5
                                    style={{
                                      textTransform: "capitalize",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {u.contests.length}
                                    {u.contests.length == 1
                                      ? " Contest"
                                      : " Contests"}
                                  </h5>
                                )}
                              </div>
                            </div>
                            <div className="icon">
                              <h5
                                style={{
                                  marginRight: "10px",
                                  color: "var(--green)",
                                }}
                              >
                                u won {u.won}
                                rs !
                              </h5>
                              <SportsCricketOutlined
                                style={{ color: "#595959", fontSize: "18px" }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    renderEmptyState()
                  )}
                </div>
              </TabPanel>
            </Box>
          </div>
        </Container>
      ) : (
        <Loader />
      )}
      <Bottomnav />
    </>
  );

  function renderDate(u) {
    return (
      <div>
        {/* <p>{hoursRemaining(u.match_start_time, "k", date)}</p> */}
        <p
          style={{
            color: "green",
            textTransform: "auto",
            fontSize: "10px",
          }}
        >
          {getDisplayDate(u.match_start_time, "i", date) &&
            getDisplayDate(u.match_start_time, "i", date)}
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EmojiEventsOutlinedIcon
            style={{ fontSize: "small", marginRight: "4px" }}
          />
          &#8377; {u.price}
        </p>
      </div>
    );
  }
}

export default Completed;
