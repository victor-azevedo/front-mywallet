import dayjs from "dayjs";
import styled from "styled-components";
import {
  incomingColor,
  ligthTextColor,
  outgoingColor,
  textColor,
} from "../constants/colors";

const isIncoming = function ({ type, balance }) {
  if (type === "incoming" || balance >= 0) {
    return true;
  }
  return false;
};

const Transactions = function ({ transactions, balance }) {
  return (
    <TransactionsStyle>
      <div className='transactions-list'>
        {transactions.map((t) => (
          <Transaction key={t._id}>
            <div className='transaction'>
              <div className='text'>
                <span className='transaction-date'>
                  {dayjs(t.date).format("DD/MM")}
                </span>
                <span className='transaction-text'>{t.description}</span>
                Jantar
              </div>
              <Value valueColor={isIncoming({ type: t.type })}>{t.value}</Value>
            </div>
          </Transaction>
        ))}
      </div>
      <div className='balance'>
        <span className='balance-text'>Saldo</span>
        <Value valueColor={isIncoming({ balance })}>{balance}</Value>
      </div>
    </TransactionsStyle>
  );
};

export default Transactions;

const TransactionsStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .transactions-list {
    padding-bottom: 10px;
    overflow: auto;
  }
  span {
    color: ${textColor};
    font-size: 16px;
    line-height: 32px;
  }
  .balance {
    box-shadow: 0 0 10px #222;
    border-radius: 5px;
    font-size: 17px;
    width: 100%;
    padding: 5px 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .balance-text {
    font-size: 17px;
    font-weight: 700;
    text-transform: uppercase;
  }
  .balance-value {
    font-size: 17px;
    font-weight: 400;
  }
  .value--incoming {
    color: ${incomingColor};
  }
  .value--outgoing {
    color: ${outgoingColor};
  }
`;

const Transaction = styled.div`
  span {
    color: ${textColor};
    font-size: 16px;
    line-height: 32px;
  }
  .transaction {
    display: flex;
    justify-content: space-between;
  }
  .transaction-date {
    color: ${ligthTextColor};
  }
  .transaction-text {
    padding-left: 10px;
  }
  .text {
    padding-right: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Value = styled.div`
  line-height: 32px;
  color: ${(props) => (props.valueColor ? incomingColor : outgoingColor)};
`;
