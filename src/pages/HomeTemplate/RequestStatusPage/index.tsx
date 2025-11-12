
import PageTitle from "../../../components/shared/PageTitle";
import Table, { type ColumnConfig } from "../../../components/shared/Table";

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
          <span className="bg-green-100 text-[var(--color-green-700)] border-[0.5px] border-green-700 p-1 rounded-[5px] w-[79px] h-[24px] px-2">Approved</span>
        ) : (
          <span className="bg-red-100 text-[var(--color-red-700)] border-[0.5px] border-red-700 p-1 rounded-[5px] w-[79px] h-[24px] px-2">Rejected</span>
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
