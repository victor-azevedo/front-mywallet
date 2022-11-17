import AddTransaction from "../../components/AddTransaction";

const IncomingPage = function ({ userData }) {
  return <AddTransaction userData={userData} type='incoming' />;
};

export default IncomingPage;
