import "../create.css";
import "../home.css";

import styled from "@emotion/styled";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import { Grid, Slider } from "@mui/material";

const ContestsContainer = styled(Grid)``;
const ContestContainer = styled.div`
  box-shadow: 0 2px 5px 1px rgba(64, 60, 67, 0.16);
  width: 100%;
  margin: 0 0;
  margin-top: 70px !important;
  cursor: pointer;
`;
const F = styled.div`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid #888;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: lowercase;
  font-size: 10px;
  margin-right: 5px;
`;
const Contest = styled.div`
  padding: 20px 20px;
  border-radius: 5px;
  .MuiSlider-thumb {
    display: none !important;
  }
  .MuiSlider-track {
    border: none;
    background-color: var(--red);
    border-radius: inherit;
  }
  .MuiSlider-root {
    color: #f25640;
  }
`;

const First = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h1 {
    font-size: 19px;
    text-transform: capitalize;
  }
  del {
    margin-right: 10px;
  }
`;

const FreeButton = styled.button`
  background-color: var(--green);
  text-transform: uppercase;
  color: #ffffff;
  padding: 10px 30px;
  border: none;
  outline: none;
  border-radius: 5px;
`;

const SliderContainer = styled.div``;
const SpotsLeft = styled.div``;

const SpotsRight = styled.div``;

const Last = styled.div`
  background-color: #f6f6f6;
  padding: 10px 10px;
  display: flex;
  align-items: center;
  color: #888;
`;

const tabs = [{ label: "winnings" }, { label: "leaderboard" }];

export function ContestDetail({ u, contest }) {
  console.log({ contest });
  return (
    <>
      <ContestsContainer container>
        {contest && (
          <ContestContainer>
            <Contest>
              <First>
                <p>Prize Pool</p>
                <p>Entry</p>
              </First>
              <First>
                <h1>{contest.entryFeeWithoutDiscount}</h1>
                <First>
                  <del>₹ {contest.entryFeeWithoutDiscount}</del>
                  <FreeButton>₹ {contest.entryFee}</FreeButton>
                </First>
              </First>
              <SliderContainer>
                <Slider
                  defaultValue={contest.totalSpots - contest.spotsLeft}
                  min={0}
                  max={contest.totalSpots}
                />
              </SliderContainer>
              <First>
                {/* <SpotsLeft>{contest.spotsLeft} spots left</SpotsLeft> */}
                {/* <SpotsRight>{contest.totalSpots} spots</SpotsRight> */}
              </First>
            </Contest>
            <Last>
              <p style={{ display: "flex", alignItems: "center" }}>
                <F>1st</F> {contest?.prizeDetails[0]?.prize}
              </p>
              <EmojiEventsOutlinedIcon
                style={{ margin: "0 15px", marginBottom: "3px" }}
              />
              {contest.numWinners}
              Winners
            </Last>
          </ContestContainer>
        )}
      </ContestsContainer>
    </>
  );
}

export default ContestDetail;
