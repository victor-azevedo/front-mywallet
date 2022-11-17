import styled from "styled-components";
import buttonStyle from "../../assets/styles/buttonStyle";
import pageStyle from "../../assets/styles/pageStyle";
import {
  incomingColor,
  ligthTextColor,
  outgoingColor,
  textColor,
} from "../../constants/colors";

const WalletPage = function () {
  return (
    <WalletPageStyled>
      <Header>
        <h2>Olá, Fulano</h2>
        <span>icon</span>
      </Header>
      <BoxTransactions>
        {/* <p className='transactions--none'>
          Não há registros de entrada ou saída
        </p> */}
        <Transactions>
          <div className='transactions-list'>
            <div className='transaction'>
              <div>
                <span className='transaction-date'>30/11</span>
                <span className='transaction-text'>Jantar</span>
                Jantar
              </div>
              <span className='transaction-value'>39,20</span>
            </div>
            <div className='transaction'>
              <div>
                <span className='transaction-date'>30/11</span>
                <span className='transaction-text'>Jantar</span>
                Jantar
              </div>
              <span className='transaction-value'>39,20</span>
            </div>
          </div>
          <div className='balance'>
            <span className='balance-text'>Saldo</span>
            <span className='balance-value'>39,20</span>
          </div>
        </Transactions>
      </BoxTransactions>
      <BoxButtons>
        <button>
          <span>icon</span>
          <span>Nova entrada</span>
        </button>
        <button>
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
`;
const BoxTransactions = styled.div`
  width: 100%;
  flex-grow: 2;
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
    color: ${ligthTextColor};
    padding: 36px;
  }
`;

const Transactions = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .transactions-list {
    height: 90%;
    overflow-y: auto;
  }
  span {
    color: ${textColor};
    font-size: 16px;
    line-height: 32px;
  }
  .transaction,
  .balance {
    display: flex;
    justify-content: space-between;
  }
  .transaction-date {
    color: ${ligthTextColor};
  }
  .transaction-text {
    padding-left: 10px;
  }
  .transaction-value {
    color: ${incomingColor};
  }
  .balance {
    /* box-shadow: 0px -10px 5px #888; */
  }
  .balance-text {
    font-size: 17px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .balance-value {
    font-size: 17px;
    font-weight: 400;
    color: ${outgoingColor};
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
