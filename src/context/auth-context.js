import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";

import { decodeToken } from "react-jwt";
import { tokenService } from "../services/token-service";

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
};

const initialState = {
  isAuthenticated: false,
  isLoadingAuth: true,
  userData: null,
  token: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const { userData, token } = action.payload;

    return {
      ...state,
      token,
      ...(userData
        ? {
            isAuthenticated: true,
            isLoadingAuth: false,
            userData,
          }
        : {
            isLoadingAuth: false,
          }),
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const { userData, token } = action.payload;

    return {
      ...state,
      token,
      isAuthenticated: true,
      userData,
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      token: null,
      isAuthenticated: false,
      userData: null,
    };
  },
};

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialized = useRef(false);

  const initialize = () => {
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    const token = tokenService.getToken();
    const userData = decodeToken(token);
    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: { userData, token },
    });
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const signIn = useCallback((token) => {
    tokenService.setToken(token);
    const userData = decodeToken(token);
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: { userData, token },
    });
  }, []);

  const signOut = useCallback(() => {
    tokenService.deleteToken();
    dispatch({
      type: HANDLERS.SIGN_OUT,
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
