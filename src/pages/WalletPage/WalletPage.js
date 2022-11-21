import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import buttonStyle from "../../assets/styles/buttonStyle";
import pageStyle from "../../assets/styles/pageStyle";
import Transactions from "../../components/Transactions";
import { lightTextColor, textColor } from "../../constants/colors";
import { BASE_URL } from "../../constants/urls";

const WalletPage = function ({ userData, setUserData }) {
  const navigate = useNavigate();
  const [userTransactions, setUserTransactions] = useState({});

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = function () {
    axios
      .get(`${BASE_URL}/transactions`, userData.requestConfig)
      .then((res) => {
        setUserTransactions({ ...res.data });
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          alert("Não autorizado, realize login");
          navigate("/sign-in");
        }
        console.log(err.response);
      });
  };

  function renderTransactions() {
    if (!userTransactions.transactions) {
      return (
        <p className='transactions--none'>
          Não há registros de entrada ou saída
        </p>
      );
    } else {
      return (
        <Transactions
          transactions={userTransactions.transactions}
          balance={userTransactions.balance}
          userData={userData}
          getTransactions={getTransactions}
        />
      );
    }
  }

  const logout = function () {
    setUserData({
      requestConfig: {
        headers: {
          Authorization: `Bearer `,
        },
      },
    });
    navigate("sign-in");
  };

  return (
    <WalletPageStyled>
      <Header>
        <h2>Olá, {userData.username}</h2>
        <span onClick={logout}>logout</span>
      </Header>
      <BoxTransactions>{renderTransactions()}</BoxTransactions>
      <BoxButtons>
        <button onClick={() => navigate("/incoming")}>
          <span>icon</span>
          <span>Nova entrada</span>
        </button>
        <button onClick={() => navigate("/outgoing")}>
          <span>icon</span>
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
