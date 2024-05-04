import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  signInWithPopup,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../utils/firebase/firebase";

interface authContextInterface {
  currentUser: User | null | undefined;
  authWithGoogle: () => void;
  authWithGithub: () => void;
  signOut: () => void;
}

const AuthContext = createContext<authContextInterface>({
  currentUser: null,
  authWithGoogle: () => {},
  authWithGithub: () => {},
  signOut: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export default function AuthProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  function authWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }

  function authWithGithub() {
    return signInWithPopup(auth, githubProvider);
  }

  function signOut() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    authWithGoogle,
    authWithGithub,
    signOut,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
