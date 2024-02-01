// AUTH
export { default as forgotPassword } from "./auth/forgot-password.js";
export { default as login } from "./auth/login.js";
export { default as logout } from "./auth/logout.js";
export { default as refreshToken } from "./auth/refresh-token.js";
export { default as register } from "./auth/register.js";
export { default as sendVerificationCode } from "./auth/send-verification-code.js";
export { default as verifyEmail } from "./auth/verify-email.js";

// EDIT
export { default as changePassword } from "./edit/change-password.js";
export { default as editUser } from "./edit/edit-user.js";

// OTHER
export { default as deleteUser } from "./delete-user.js";
export { default as getMatches } from "./get-matches.js";
export { default as getProfilePic } from "./get-profile-pic.js";
export { default as getTeam } from "./get-team.js";
export { default as getTeams } from "./get-teams.js";
export { default as getUser } from "./get-user.js";
export { default as saveTeam } from "./save-team.js";
export { default as updateTeam } from "./update-team.js";
export { default as processReferral } from "./process-referral.js";
