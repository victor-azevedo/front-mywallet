import {
  ExportOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import pageStyle from "../../assets/styles/pageStyle";
import ButtonStyled from "../../components/EmphasisButton";
import Transactions from "../../components/Transactions";
import { lightTextColor, textColor } from "../../constants/colors";
import authPageWrapper from "../../hoc/authPageWrapper-hoc";
import useApiAuth from "../../hooks/useApiAuth-hook";
import useAuth from "../../hooks/useAuth-hook";

const initialTransactionsState = {
  userId: null,
  balance: null,
  transactions: [],
};

const WalletPage = function () {
  const { userData, signOut } = useAuth();
  const apiAuth = useApiAuth();
  const navigate = useNavigate();

  const [userTransactions, setUserTransactions] = useState(
    initialTransactionsState
  );
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTransactions = useCallback(() => {
    apiAuth
      .get("/transactions")
      .then((res) => {
        setUserTransactions({ ...res.data });
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Não autorizado, realize login");
          navigate("/sign-in");
        } else if (err.response.data.message) {
          alert(err.response.data.message);
        } else {
          alert(err.response.data);
        }
      })
      .finally(() => setIsLoadingData(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = function () {
    signOut();
    navigate("sign-in");
  };

  return (
    <>
      {!isLoadingData ? (
        <WalletPageStyled>
          <Header>
            <h2>Olá, {userData.username}</h2>
            <div onClick={logout}>
              <ExportOutlined />
            </div>
          </Header>
          <BoxTransactions>
            <Transactions
              transactions={userTransactions.transactions}
              balance={userTransactions.balance}
              getTransactions={getTransactions}
            />
          </BoxTransactions>
          <BoxButtons>
            <ButtonStyled
              onClick={() => navigate("/incoming")}
              text="Nova entrada"
            >
              <PlusCircleOutlined />
            </ButtonStyled>
            <ButtonStyled
              onClick={() => navigate("/outgoing")}
              text="Nova saída"
            >
              <MinusCircleOutlined />
            </ButtonStyled>
          </BoxButtons>
        </WalletPageStyled>
      ) : (
        ""
      )}
    </>
  );
};

export default authPageWrapper(WalletPage);

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
`;
