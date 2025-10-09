import ScheduleDetailCard from "../../../components/ClassOverviewPage/ScheduleDetailCard";
import PageTitle from "../../../components/shared/PageTitle";
import Table, { type ColumnConfig } from "../../../components/shared/Table";

type Member = {
  name: string;
  id: string;
  avatar: string;
};

type RowData = {
  no: number;
  member: Member;
  ID: string;
  email: string;
  note: string;
};

const ClassOverviewPage = () => {
  const columns: ColumnConfig<RowData>[] = [
    { key: "no", title: "No.", width: "88px" },
    {
      key: "member",
      title: "Member",
      width: "240px",
      render: (_val, row) => (
        <div className="flex items-center gap-3">
          <img
            className="rounded-full size-11"
            src={row.member.avatar}
            alt=""
          />
          <div>
            <p className="font-medium text-primary">{row.member.name}</p>
            <p className="text-sm text-gray-600">{row.member.id}</p>
          </div>
        </div>
      ),
    },
    { key: "ID", title: "ID", width: "240px" },
    { key: "email", title: "Email", width: "240px" },
    { key: "note", title: "Note", width: "auto" },
  ];

  const data = [
    {
      no: 1,
      member: {
        name: "Vo Minh Nghia",
        id: "BCS202211",
        avatar: "/images/Student/image.png",
      },
      ID: "GCS230351",
      email: "nghiavmgcs230351@fpt.edu.vn",
      note: "Good student",
    },
    {
      no: 2,
      member: {
        name: "Nguyen Huu Tai",
        id: "BCS202211",
        avatar: "/images/Student/image.png",
      },
      ID: "GCS230351",
      email: "nghiavmgcs230351@fpt.edu.vn",
      note: "Good student",
    },
    {
      no: 3,
      member: {
        name: "Nguyen Dinh Hieu",
        id: "BCS202211",
        avatar: "/images/Student/image.png",
      },
      ID: "GCS230351",
      email: "nghiavmgcs230351@fpt.edu.vn",
      note: "Good student",
    },
  ];

  return (
    <div className="space-y-12">
      <PageTitle title="Class Overview" breadcrumb="class" />

      <ScheduleDetailCard />

      <Table columns={columns} data={data} />
    </div>
  );
};

export default ClassOverviewPage;
