import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GlobalStyle from "./assets/styles/GlobalStyle";
import AuthProvider from "./context/auth-context";
import IncomingPage from "./pages/IncomingPage/IncomingPage";
import OutgoingPage from "./pages/OutgoingPage/OutgoingPage";
import SingInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import WalletPage from "./pages/WalletPage/WalletPage";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AuthProvider>
        <Routes>
          <Route path="" element={<WalletPage />} />
          <Route path="/sign-in" element={<SingInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/incoming" element={<IncomingPage />} />
          <Route path="/outgoing" element={<OutgoingPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
