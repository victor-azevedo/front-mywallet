import AddOrEditTransaction from "../../components/AddOrEditTransaction";
import authPageWrapper from "../../hoc/authPageWrapper-hoc";

const IncomingPage = function () {
  return <AddOrEditTransaction type="incoming" />;
};

export default authPageWrapper(IncomingPage);
