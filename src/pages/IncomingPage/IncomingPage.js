import AddTransaction from "../../components/AddTransaction";
import authPageWrapper from "../../hoc/authPageWrapper-hoc";

const IncomingPage = function () {
  return <AddTransaction type="incoming" />;
};

export default authPageWrapper(IncomingPage);
