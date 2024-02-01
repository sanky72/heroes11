export function playedlm(arr, p) {
  const exists = arr.find((f) => f.player_id == p.player_id);
  if (exists) {
    return true;
  }
  return false;
}
