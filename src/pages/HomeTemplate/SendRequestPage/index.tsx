import { useParams } from "react-router-dom";

import RequestForm from "../../../components/RequestPage/RequestForm";
import PageTitle from "../../../components/shared/PageTitle";

type RequestPageParams = {
  requestType: string;
};

const SendRequestPage = () => {
  const { requestType } = useParams<RequestPageParams>();

  return (
    <div className="space-y-4.5">
      {requestType === "verification" ? (
        <>
          <PageTitle
            breadcrumb="Student Status Verification"
          />

          <RequestForm requestType="verification" />
        </>
      ) : (
        <>
          <PageTitle breadcrumb="Document Request" />

          <RequestForm requestType="document" />
        </>
      )}
    </div>
  );
};

export default SendRequestPage;
