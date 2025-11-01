
import PageTitle from "../../../components/shared/PageTitle";
import { type ColumnConfig } from "../../../components/shared/Table";
import Table from "../../../components/shared/Table";

type RequestData = {
  refId: number;
  date: string;
  purpose: string;
  response: string;
  status: boolean;
};

const RequestStatusPage = () => {
  const columns: ColumnConfig<RequestData>[] = [
    { key: "refId", title: "REF ID", width: "104px" },
    { key: "date", title: "Date", width: "140px" },
    { key: "purpose", title: "Purpose", width: "410px" },
    { key: "response", title: "Response", width: "410px" },
    {
      key: "status",
      title: "Status",
      width: "216px",
      render: (row) => (
        row === true ? (
          <span className="bg-approve text-white p-2 rounded-md">Approved</span>
        ) : (
          <span className="bg-danger text-white p-2 rounded-md">Rejected</span>
        )
      ),
    },
  ];

  const data = [
    {
      refId: 40643,
      date: "19/02/2024",
      purpose:
        "purpose",
      response:
        "response",
      status: true,
    },
    {
      refId: 40644,
      date: "28/10/2024",
      purpose:
        "purpose",
      response:
        "response",
      status: false,
    },
  ];

  return (
    <div className="space-y-4.5">
      <PageTitle breadcrumb="My Request" />

      <Table columns={columns} data={data} color="bg-primary" textColor="text-white" centered={true} />
    </div>
  );
};

export default RequestStatusPage;
