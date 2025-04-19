import { getLocalStorageItem } from "@/helpers/localStorage";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface Context {
  isSignedIn: boolean;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<Context>({} as Context);

interface Props {
  children: ReactNode;
}

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const token = getLocalStorageItem({ key: "JWT" });

  useEffect(() => {
    if (token) {
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        setIsSignedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
