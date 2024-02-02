import styled from "@emotion/styled";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Dialog } from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { showToast } from "../actions/toastAction";
import { API } from "../actions/userAction";
import { URL } from "../constants/userConstants";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const Main = styled.div`
  width: 260px;
  height: 400px;
  padding: 0 12px;
  background-color: #ffffff;
  overflow: hidden;
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
`;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const JoinButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
  color: #ffffff;
  border: none;
  padding: 8px 15px;
  margin: 0 auto;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const Para = styled.p`
  text-align: center;
  font-size: 10px;
`;
export default function ConfirmModal({
  open,
  setOpen,
  handleclose,
  modal,
  teamid,
  id,
  contestid,
  loadJoined,
  setSelectedTeam,
}) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleClose = () => {
    handleclose();
    setOpen(false);
  };
  const join = async () => {
    try {
      const entryFee = modal.price / modal.totalSpots;
      await API.post(`${URL}/payment/deduct`, {
        amount: entryFee,
      });

      const data = await API.post(`${URL}/contest/join`, {
        team: {
          team_id: teamid,
          user_id: user._id,
          username: user.username,
          rank: 1,
          points: 0,
        },

        user_id: user._id,
        contestId: modal._id,
        matchId: id,
        entryFee,
        totalSpots: modal.totalSpots,
      });
      console.log("CONTEST JOINED", data.data.resultMessage.en);
      window.store.dispatch(showToast(data.data.resultMessage.en));
      loadJoined();
      setSelectedTeam(null);
      setOpen(false);
    } catch (e) {
      window.store.dispatch(showToast(e.response.data.message, "Error"));
      setOpen(false);
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{ height: "400px" }}
    >
      {modal && (
        <Main>
          <FlexBox>
            <h5>Confirmation</h5>
            <h5>
              <CloseRoundedIcon
                onClick={() => handleClose()}
                style={{ cursor: "pointer" }}
              />
            </h5>
          </FlexBox>
          <FlexBox>
            <h6>Entry</h6>
            <h6>{modal.entryFee}</h6>
          </FlexBox>
          {/* <FlexBox>
            <h6>Apply 25 coupon</h6>
            <h6>25%</h6>
          </FlexBox> */}
          <FlexBox>
            <h6>usable cash bonus</h6>
            <h6>0</h6>
          </FlexBox>
          <FlexBox>
            <h3>To Pay</h3>
            <h3>{modal.entryFee}</h3>
          </FlexBox>

          <Para>
            By joining this contest, you accept Heroes11 T&C's and confirm that
            you are not resident of Andhra Pradesh, Assam, Nagaland, Odisha,
            Sikkim or Telangana. I also agree to be contacted by Heroes11 and
            their partners.
          </Para>
          <JoinButton onClick={() => join()}>join contest</JoinButton>
        </Main>
      )}
    </Dialog>
  );
}
