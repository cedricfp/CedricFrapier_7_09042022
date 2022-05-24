export function isUserLogged() {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
}
