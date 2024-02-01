import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import pitchImage from "../assets/background.jpg";
import "./create.css";
import "./home.css";

import { API } from "../actions/userAction";
import { URL } from "../constants/userConstants";
import { ProfilePic } from "../shared/components/ProfilePic";
import Loader from "./loader";

const Container = styled.div`
  background: url(${pitchImage}) no-repeat center center fixed;
  width: 100% !important;
  height: 100vh !important;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-family: "Open Sans";
`;

const PlayerP = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  img {
    width: 70px !important;
    height: 70px !important;
    display: block;
    border-radius: 50%;
  }
  p {
    margin: 0 !important;
    padding: 0 10px !important;
  }
`;

const Title = styled.p`
  position: absolute;
  bottom: 0px;
  background-color: var(--black);
  color: #ffffff;
  padding: 2px 5px;
  border-radius: 2px;
  max-width: 75px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function SavedTeam() {
  const navigate = useNavigate();
  const { state = {} } = useLocation();
  const [upcoming, setUpcoming] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const { id } = useParams();
  const [live, setLive] = useState([]);
  const [past, setPast] = useState([]);
  const [save, setSave] = useState(false);
  const [players, setPlayers] = useState(state?.players);
  useEffect(() => {
    async function getteam() {
      const data = await API.get(`${URL}/user/team?id=${id}`);
      setPlayers(data.data.team.players);
    }
    if (!players) {
      getteam();
    }
  }, [id]);

  return (
    <div style={{ height: "100%" }}>
      {players ? (
        <Container>
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
              color: "white",
            }}
          >
            <CloseIcon onClick={() => navigate(-1)} />
          </div>
          <Grid container justifyContent="space-evenly" justify="space-evenly">
            {players.slice(0, 2).map((p) => (
              <Grid item xs={6} sm={6}>
                <PlayerP>
                  <ProfilePic pic={p.profile_photo} />
                  <Title>{p.player_name.split(" ")[0]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {players.slice(2, 6).map((p) => (
              <Grid item xs={3} sm={3}>
                <PlayerP>
                  <ProfilePic pic={p.profile_photo} />
                  <Title>{p.player_name.split(" ")[0]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {players.slice(6, 8).map((p) => (
              <Grid item xs={6} sm={6}>
                <PlayerP>
                  <ProfilePic pic={p.profile_photo} />
                  <Title>{p.player_name.split(" ")[0]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
          <Grid container>
            {players.slice(8, 11).map((p) => (
              <Grid item xs={4} sm={4}>
                <PlayerP>
                  <ProfilePic pic={p.profile_photo} />
                  <Title>{p.player_name.split(" ")[0]}</Title>
                </PlayerP>
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default SavedTeam;
