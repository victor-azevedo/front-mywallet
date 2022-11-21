import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";
import IncomingPage from "./pages/IncomingPage/IncomingPage";
import OutgoingPage from "./pages/OutgoingPage/OutgoingPage";
import SingInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import WalletPage from "./pages/WalletPage/WalletPage";

function App() {
  const [userData, setUserData] = useState({
    requestConfig: {
      headers: {
        Authorization: `Bearer `,
      },
    },
  });

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route
          path='/'
          element={<WalletPage userData={userData} setUserData={setUserData} />}
        />
        <Route
          path='/sign-in'
          element={<SingInPage setUserData={setUserData} />}
        />
        <Route path='/sign-up' element={<SignUpPage />} />
        <Route
          path='/incoming'
          element={<IncomingPage userData={userData} />}
        />
        <Route
          path='/outgoing'
          element={<OutgoingPage userData={userData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
