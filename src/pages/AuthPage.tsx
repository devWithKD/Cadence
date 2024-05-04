import { useAuth } from "../store/auth-context";
import Button from "../components/Button";
import { Navigate } from "react-router-dom";

export default function AuthPage() {
  const { currentUser, authWithGoogle, authWithGithub } = useAuth();

  return (
    <>
      {currentUser ? (
        <Navigate to="/board" />
      ) : (
        <div className="w-screen primary-bf flex flex-col justify-center items-center">
          <Button title="Sign In with Google" onClick={authWithGoogle} />
          <Button title="Sign In with Github" onClick={authWithGithub} />
        </div>
      )}
    </>
  );
}
