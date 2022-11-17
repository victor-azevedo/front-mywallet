import AddTransaction from "../../components/AddTransaction";

const OutgoingPage = function ({ userData }) {
  return <AddTransaction userData={userData} type='outgoing' />;
};

export default OutgoingPage;
