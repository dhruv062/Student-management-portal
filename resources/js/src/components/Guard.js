
import NotAuthorized from "./NotAuthorized";
import { useUser } from "../contexts/UserContext";

export default function Guard({ children,role }) {
  const { user } = useUser();
  // console.log(user);
  if (user && user.role === role) {
    return children; // Render the protected routes for instructors
  }

  // Redirect or display an unauthorized message
  return <NotAuthorized />
}