import AddOrEditTransaction from "../../components/AddOrEditTransaction";
import authPageWrapper from "../../hoc/authPageWrapper-hoc";

const OutgoingPage = function () {
  return <AddOrEditTransaction type="outgoing" />;
};

export default authPageWrapper(OutgoingPage);
