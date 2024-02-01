export function getProfileId(url, size = "300x300") {
  // Check if the URL is not empty
  if (!url) {
    return null;
  }
  const parts = url.split("/");
  return parts[parts.length - 1];
}

export function checkWicketKeeper(p) {
  if (p == "WK" || p == "wk-batsman" || p == "wicket keeper") {
    return true;
  }
  return false;
}

export function checkAllRounder(p) {
  if (
    p == "allrounder" ||
    p == "batting allrounder" ||
    p == "bowling allrounder" ||
    p == "ALL"
  ) {
    return true;
  }
  return false;
}

export function isUnAnnounced(id, players) {
  return true;
}
