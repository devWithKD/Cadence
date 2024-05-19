import {
  GithubAuthProvider,
  GoogleAuthProvider,
  User,
  signInWithPopup,
} from "firebase/auth";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../utils/firebase/firebase";
import { createUserIfNotExist } from "../utils/firebase/user";

type appMode = "demo" | "full";
interface authContextInterface {
  currentUser: User | null | undefined;
  mode: appMode;
  authWithGoogle: () => void;
  authWithGithub: () => void;
  setMode: (mode: appMode) => void;
  signOut: () => void;
}

const AuthContext = createContext<authContextInterface>({
  currentUser: null,
  mode: "demo",
  authWithGoogle: () => {},
  authWithGithub: () => {},
  setMode: () => {},
  signOut: () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
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
  const [mode, setMode] = useState<"demo" | "full">(() =>
    currentUser == null ? "demo" : "full"
  );

  function authWithGoogle() {
    return signInWithPopup(auth, googleProvider)
      .then(createUserIfNotExist)
      .catch((err) => {
        console.log(err);
      });
  }

  const authWithGithub = useCallback(() => {
    return signInWithPopup(auth, githubProvider)
      .then(createUserIfNotExist)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const signOut = useCallback(() => auth.signOut(), []);

  const setAppMode = useCallback((mode: appMode) => setMode(mode), []);

  const value = {
    currentUser,
    mode,
    authWithGoogle,
    authWithGithub,
    setMode: setAppMode,
    signOut,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser != null) setAppMode("full");
  }, [currentUser, setAppMode]);
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
