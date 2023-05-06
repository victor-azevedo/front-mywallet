import AddTransaction from "../../components/AddTransaction";
import authPageWrapper from "../../hoc/authPageWrapper-hoc";

const OutgoingPage = function () {
  return <AddTransaction type="outgoing" />;
};

export default authPageWrapper(OutgoingPage);
