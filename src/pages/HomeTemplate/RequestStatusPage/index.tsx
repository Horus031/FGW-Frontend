
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
        "Nguyễn Lê Thắng - GDS200281 Xin đổi lớp chéo với Lâm Hoàng Phúc - GDS210448 (OJT1 sang OJT4)",
      response:
        "Chào em, hiện tại lớp OJT4 đã rất đông rồi em nhé, nên rất tiếc phòng đào tạo không thể hỗ trợ sinh viên. Em có thể chuyển qua lớp OJT 2 vì lớp này còn sĩ số phù hợp. Cảm ơn em",
      status: true,
    },
    {
      refId: 40644,
      date: "28/10/2024",
      purpose:
        "Nguyễn Lê Thắng - GDS200281 Em chào anh/chị phòng Đào Tạo, em làm đơn này để xin anh/chị xem xét cho e miễn học môn võ do vấn đề sức khoẻ sau phẫu thuật. Bác sĩ có dặn với em là không được có va chạm mạnh hay té mà ảnh hưởng đến cả chân vì nếu vậy có thể sẽ phẩu thuật tiếp (em bị đa u sợi thần kinh). Hiện tại em bị bàn chân rũ hậu phẫu thuật chân trái khi đi rất dễ vấp té nếu có những tác động nên em sợ khi học võ có thể xảy ra những tình huống đáng tiếc. Mọi giấy tờ liên quan em sẽ đính kèm file pdf. Em mong anh/chị xem xét cho em. Em cảm ơn anh chị rất nhiều ạ.",
      response:
        "Phòng đào tao xin từ chối đơn xin miễn môn võ vì lý do theo quy đinh phòng đào tao chỉ xét miễn khi sinh viên đã có chứng chỉ hoặc bảng điểm đã được cấp ở các trường cao đẳng/đại học khác để xét tương đương. Trường hợp của bạn, phòng đào tạo sẽ gửi thông tin đến giảng viên bao gồm hồ sơ bệnh án và báo giảng viên hô trợ giảm cường độ tập luyện cho bạn. Bạn chủ động liên hệ thêm đến giảng viên khi phát sinh lịch học hoặc làm lại đơn AP để được hỗ trợ khi môn học bắt đầu nhé.",
      status: false,
    },
  ];

  return (
    <div className="space-y-6">
      <PageTitle breadcrumb="My Request" />

      <Table columns={columns} data={data} color="bg-primary" textColor="text-white" centered={true} />
    </div>
  );
};

export default RequestStatusPage;
