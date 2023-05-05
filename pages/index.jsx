/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as LogoutIcon } from "../public/svg/logout.svg";
import { ReactComponent as IncomingIcon } from "../public/svg/minus.svg";
import { ReactComponent as OutgoingIcon } from "../public/svg/plus.svg";
import Transactions from "../src/components/Transactions";
import { lightTextColor, textColor } from "../src/constants/colors";
import useAuth from "../src/hooks/useAuth-hook";
import { api } from "../src/services/api-service";
import buttonStyle from "../src/styles/buttonStyle";
import pageStyle from "../src/styles/pageStyle";

const WalletPage = () => {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const [userTransactions, setUserTransactions] = useState({});

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = function () {
    api
      .get("/transactions")
      .then((res) => {
        setUserTransactions({ ...res.data });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Não autorizado, realize login");
          router.push("/sign-in");
        } else if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert(err.response.data);
        }
      });
  };

  function renderTransactions() {
    if (!userTransactions.transactions) {
      return (
        <p className="transactions--none">
          Não há registros de entrada ou saída
        </p>
      );
    } else {
      return (
        <Transactions
          transactions={userTransactions.transactions}
          balance={userTransactions.balance}
          getTransactions={getTransactions}
        />
      );
    }
  }

  const logout = function () {
    signOut();
    router.push("sign-in");
  };

  return (
    <WalletPageStyled>
      <Header>
        <h2>Olá, {user.username}</h2>
        <StyledLogoutIcon onClick={logout} />
      </Header>
      <BoxTransactions>{renderTransactions()}</BoxTransactions>
      <BoxButtons>
        <button onClick={() => router.push("/incoming")}>
          <StyledIncomingIcon />
          <span>Nova entrada</span>
        </button>
        <button onClick={() => router.push("/outgoing")}>
          <StyledOutgoingIcon />
          <span>Nova saída</span>
        </button>
      </BoxButtons>
    </WalletPageStyled>
  );
};

export default WalletPage;

const WalletPageStyled = styled.main`
  ${pageStyle};
  justify-content: space-around;
`;
const Header = styled.header`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    text-transform: capitalize;
  }
`;
const BoxTransactions = styled.div`
  width: 100%;
  flex-grow: 2;
  max-height: 65%;
  margin: 15px 0;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: ${textColor};
  .transactions--none {
    font-size: 20px;
    line-height: 23px;
    text-align: center;
    color: ${lightTextColor};
    padding: 36px;
  }
`;

const BoxButtons = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  button {
    ${buttonStyle}
    flex: 1 0 45%;
    margin: 0;
    padding: 10px 10px;
    height: 100%;
    font-size: 17px;
    line-height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    span {
      display: block;
      max-width: 85px;
      text-align: left;
    }
  }
`;

const StyledIncomingIcon = styled(IncomingIcon)`
  height: 28px;
  path {
    fill: #fff;
    stroke-width: 48;
  }
`;

const StyledOutgoingIcon = styled(OutgoingIcon)`
  height: 28px;
  path {
    fill: #fff;
    stroke-width: 48;
  }
`;

const StyledLogoutIcon = styled(LogoutIcon)`
  height: 28px;
  path {
    fill: #fff;
    stroke-width: 48;
  }
  &:hover {
    cursor: pointer;
  }
`;
