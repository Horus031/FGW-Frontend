import RequestForm from "@/components/RequestPage/RequestForm";
import PageTitle from "@/components/shared/PageTitle";
import { useParams } from "react-router-dom";

type RequestPageParams = {
  requestType: string;
};

const RequestPage = () => {
  const { requestType } = useParams<RequestPageParams>();

  return (
    <div className="space-y-12">
      {requestType === "verification" ? (
        <>
          <PageTitle
            title="Student Status Verification"
            breadcrumb="Student Status Verification"
          />

          <RequestForm requestType="verification" />
        </>
      ) : (
        <>
          <PageTitle title="Document Request" breadcrumb="Document Request" />

          <RequestForm requestType="document" />
        </>
      )}
    </div>
  );
};

export default RequestPage;
