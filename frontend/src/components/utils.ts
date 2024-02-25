import { AUTH_STORE_KEY } from "../constans";
import { AuthCrendential } from "../contexts/AuthContext";

export function getAuthCrendentialsFromLocal() {
  const authTokenJSON = localStorage.getItem(AUTH_STORE_KEY);
  if (authTokenJSON) {
    return JSON.parse(authTokenJSON) as AuthCrendential
  }
  return null
}
