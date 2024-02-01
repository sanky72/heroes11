import "./create.css";
import "./home.css";

import styled from "@emotion/styled";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import NotificationAddOutlinedIcon from "@mui/icons-material/NotificationAddOutlined";
import WestIcon from "@mui/icons-material/West";
import { Button, Drawer, Grid } from "@mui/material";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import db from "../firebase";
import { showName } from "../utils/name";
import MatchTabs from "./MatchTabs";
import ShowOver from "./showover";
import { API } from "../actions/userAction";
import { URL } from "../constants/userConstants";

const TopContainer = styled.div`
  background-color: var(--black);
  color: #ffffff;
  p {
    text-transform: capitalize;
    font-weight: 800;
    font-size: 14px;
    padding: 3px 0;
    color: #757272;
  }
  padding: 10px 20px;
  position: fixed;
  height: 50px;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 550px;
  z-index: 1000;
  box-sizing: border-box;
  display: flex;
  align-items: center;
`;

const GreenMark = styled.span`
  background-color: var(--green);
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: block;
  margin-right: 6px;
`;
const Top = styled.div`
  background-color: var(--black);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 2px;
`;

const Bottom = styled.div`
  margin-top: 65px;
  z-index: 10;
`;
const LeftSide = styled.div`
  width: 170px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 16px;
    font-family: "Open Sans";
    text-transform: uppercase;
  }
`;

const RightSide = styled.div`
  width: 130px;
  display: flex;
  justify-content: space-between;
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
  .MuiTabScrollButton-root {
    width: 15px;
    white-space: nowrap;
  }
`;

const Separator = styled.div`
  margin-top: 5px;
  height: 1px;
  background-color: #757272;
  width: 100%;
`;

const Batsman = styled.div`
  width: 140px;
  font-size: 12px;
  margin-right: 10px;
`;

const Bowler = styled.div`
  width: 140px;
  font-size: 12px;
`;
const Name = styled.h5`
  white-space: nowrap;
  font-size: 12px;
  width: 85px;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const BowlTop = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  margin-top: 1px;
`;

const BottomT = styled.div`
  display: flex;
  margin-top: 3px;
  justify-content: space-between;
`;
const WithdrawContainer = styled(Grid)``;

const Detail = styled.div`
  border-top: 1px solid #dddddd;
  margin-top: 10px;
  text-align: left;
  padding: 10px 5px;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;
const DetailTop = styled.div`
  margin-top: 10px;
  text-align: center;
  padding: 10px 0;
  p {
    color: rgba(0, 0, 0, 0.6);
    text-transform: uppercase;
  }
`;
const AddButton = styled(Button)`
  background-color: var(--green);
  color: #ffffff;
  width: 160px;
  margin: 0 auto;
  &:hover {
    background-color: var(--green);
    color: #ffffff;
  }
`;
export function MatchDetails({ players }) {
  const { state } = useLocation();
  console.log("state match", state?.u);
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.user
  );
  const { match_details, matchlive } = useSelector((state) => state.match);
  const [contests, setContests] = useState([]);
  const dispatch = useDispatch();
  const [commentary, setCommentary] = useState([]);
  const [livescore, setLivescore] = useState();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const showAnimation = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  useEffect(() => {
    async function getdata(m) {
      if (match_details?.matchId) {
        const docRef = doc(db, "commentary", match_details.matchId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        } else {
          // docSnap.data() will be undefined in this case
        }
        const unsub = onSnapshot(
          doc(db, "commentary", match_details?.matchId),
          (doc) => {
            if (doc.data()) {
              console.log(doc.data(), "data");
              setCommentary([...doc.data().capital]);
              setLivescore({ ...doc.data().miniscore });
            }
          }
        );
      }
    }
    getdata(match_details);
    // onSnapshot((docRef, "cities"), (snapshot) => {
    // let array = []; // Get users all recent talks and render that in leftColumn content
    // console.log(snapshot, "snaps");
    // });
  }, [match_details]);

  useEffect(() => {
    window.addEventListener("resize", showAnimation);
    return () => {
      window.removeEventListener("resize", showAnimation);
    };
  }, [dimensions]);
  const { search } = useLocation();
  const history = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    async function getupcoming() {
      if (id?.length > 3) {
        // dispatch(getmatch(id));
        const res = await API.get(`${URL}/match/contestsPrizes`);
        const data = res.data;
        setContests(data.contests);
      }
    }
    getupcoming();
  }, [id]);
  return (
    <Container>
      <>
        <TopContainer>
          <Top>
            <LeftSide>
              <WestIcon
                onClick={() => history(-1)}
                style={{ cursor: "pointer" }}
              />
              {match_details && (
                <h1>
                  {match_details.teamAwayCode} Vs {match_details.teamHomeCode}
                </h1>
              )}
            </LeftSide>
            <RightSide>
              <AccountBalanceWalletOutlinedIcon
                onClick={() => handleClick()}
                style={{
                  cursor: "pointer",
                  fontSize: "20px",
                  stroke: "white",
                  position: "absolute",
                  marginLeft: "100px",
                  strokeWidth: "1.5",
                }}
              />
            </RightSide>
            <Drawer
              className="account-drawer"
              anchor="top"
              open={open}
              onClose={() => setOpen(false)}
            >
              <DetailTop>
                <p>Total balance</p>
                <h5>₹{user && user.wallet}</h5>
              </DetailTop>
              <AddButton
                onClick={() =>
                  history("/payment", {
                    state: {
                      tab: "deposit",
                    },
                  })
                }
              >
                add cash
              </AddButton>
              <Detail>
                <p>Amount added</p>
                <h5>₹ {user?.totalAmountAdded}</h5>
              </Detail>
              <Detail>
                <WithdrawContainer container>
                  <Grid item sm={7} xs={7}>
                    <p>winnings</p>
                    <h5>₹ {user?.totalAmountWon}</h5>
                  </Grid>
                  <Grid item sm={5} xx={5}>
                    <Button
                      onClick={() =>
                        history("/transaction", {
                          state: {
                            tab: "withdrawal",
                          },
                        })
                      }
                    >
                      Withdraw
                    </Button>
                  </Grid>
                </WithdrawContainer>
              </Detail>
              <Detail>
                <p>cash bonus</p>
                <h5>₹ 0</h5>
              </Detail>
            </Drawer>
          </Top>
          {matchlive?.runFI && livescore?.matchScoreDetails && (
            <>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item sm={4} xs={4} style={{ textAlign: "left" }}>
                  <p
                    style={{
                      height: "15px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {matchlive.titleFI}
                  </p>
                  <p>
                    {livescore.matchScoreDetails.inningsScoreList[0]?.score}/
                    {livescore.matchScoreDetails.inningsScoreList[0]?.wickets ||
                      0}
                    ({livescore.matchScoreDetails.inningsScoreList[0]?.overs})
                  </p>
                </Grid>
                <Grid
                  item
                  sm={4}
                  xs={4}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GreenMark />
                  {matchlive.result == "Complete" ? "Completed" : "In Play"}
                </Grid>
                <Grid item sm={4} xs={4} style={{ textAlign: "right" }}>
                  {matchlive?.runSI && livescore?.matchScoreDetails && (
                    <>
                      <p
                        style={{
                          height: "15px",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {" "}
                        {matchlive.titleSI}
                      </p>
                      <p>
                        {" "}
                        {livescore.matchScoreDetails.inningsScoreList[1]?.score}
                        /
                        {livescore.matchScoreDetails.inningsScoreList[1]
                          ?.wickets || 0}
                        (
                        {livescore.matchScoreDetails.inningsScoreList[1]?.overs}
                        )
                      </p>
                    </>
                  )}
                </Grid>
              </Grid>
              <p
                style={{
                  textAlign: "center",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                {matchlive?.status?.split("(11b rem)").join("")}
              </p>
              <Separator />
              <BottomT>
                <Batsman>
                  <BowlTop>
                    <Name>{showName(livescore?.batsmanStriker?.batName)}</Name>
                    {livescore?.batsmanStriker?.batRuns}(
                    {livescore?.batsmanStriker?.batBalls})
                  </BowlTop>
                  <BowlTop>
                    <Name>
                      {showName(livescore?.batsmanNonStriker?.batName)}
                      ()
                    </Name>
                    {livescore?.batsmanNonStriker?.batRuns}(
                    {livescore?.batsmanNonStriker?.batBalls})
                  </BowlTop>
                </Batsman>
                <Bowler>
                  <BowlTop>
                    <Name>{showName(livescore?.bowlerStriker?.bowlName)}</Name>
                    {livescore?.bowlerStriker?.bowlWkts}/
                    {livescore?.bowlerStriker?.bowlRuns}(
                    {livescore?.bowlerStriker?.bowlOvs})
                  </BowlTop>
                  <BowlTop>
                    <ShowOver arr={livescore?.recentOvsStats} />
                  </BowlTop>
                </Bowler>
              </BottomT>
            </>
          )}
        </TopContainer>
        <Bottom>
          <MatchTabs
            tabs={contests}
            id={id}
            g={match_details}
            livescore={livescore}
            selectedTab={state?.selectedTab}
          />
        </Bottom>
      </>
    </Container>
  );
}

export default MatchDetails;
