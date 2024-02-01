import { URL } from "../../constants/userConstants";
import { getProfileId } from "../../utils/img_url";

export const ProfilePic = ({ pic }) => {
  return (
    <img
      crossorigin="anonymous"
      src={`${URL}/user/profile-pic?id=${getProfileId(pic)}`}
      alt=""
    />
  );
};
