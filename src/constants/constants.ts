
export const DOCUMENT_OPTIONS = [
  { value: "Interim Academic Transcript", label: "Interim Academic Transcript" },
  { value: "Interruption of Study", label: "Interruption of Study" },
  { value: "Recheck of your mark", label: "Recheck of your mark" },
  { value: "Transfer to Another Programme", label: "Transfer to Another Programme" },
  { value: "Transfer to Another Institution", label: "Transfer to Another Institution" },
  { value: "Transfer to Another Class", label: "Transfer to Another Class" },
  { value: "Request for Attendance Adjustment", label: "Request for Attendance Adjustment" },
  { value: "Other Requests", label: "Other Requests" },
];

export const VERIFICATION_OPTIONS = [
  { value: "Interruption of Study", label: "Interruption of Study" },
  { value: "Hoãn nghĩa vụ quân sự", label: "Hoãn nghĩa vụ quân sự" },
  { value: "Giấy giới thiệu", label: "Giấy giới thiệu" },
  { value: "Đề nghị Xác nhận sinh viên tiếng Anh", label: "Đề nghị Xác nhận sinh viên tiếng Anh" },
  { value: "Đề nghị xác nhận sinh viên tiếng Việt", label: "Đề nghị xác nhận sinh viên tiếng Việt" },
  { value: "Cấp thẻ SV tạm thời", label: "Cấp thẻ SV tạm thời" },
  { value: "Giấy xác nhận vay vốn", label: "Giấy xác nhận vay vốn" },
  { value: "Cấp lại thẻ SV", label: "Cấp lại thẻ SV" },
];

export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const TIME_SLOTS = [
  {
    start: "08:00", 
    end: "09:30"
  },
  {
    start: "9:30", 
    end: "11:00"
  },
  {
    start: "12:00", 
    end: "13:30"
  },
  {
    start: "13:30", 
    end: "15:00"
  },
  {
    start: "15:30", 
    end: "17:00"
  },
  {
    start: "17:00", 
    end: "18:30"
  },
  {
    start: "17:30", 
    end: "19:00"
  },
  {
    start: "19:00", 
    end: "20:30"
  },
]

export const FEEDBACK_QUESTIONS = [
  {
    title: "Regarding the teacher's punctuality",
    subtitle: "Sự đúng giờ của giảng viên trong giờ học",
    options: [
      {
        value: "1",
        label: "Always punctual",
        trans: "Luôn đúng giờ"
      },
      {
        value: "2",
        label: "Mostly punctual",
        trans: "Phần lớn đúng giờ"
      },
      {
        value: "3",
        label: "Rarely punctual",
        trans: "Ít khi đúng giờ"
      },
      {
        value: "4",
        label: "Not at all punctual",
        trans: "Không bao giờ đúng giờ"
      }
    ]
  },
  {
    title: "Teaching skills of teacher",
    subtitle: "Kỹ năng sư phạm của giảng viên",
    options: [
      {
        value: "1",
        label: "Very Good",
        trans: "Tốt"
      },
      {
        value: "2",
        label: "Good",
        trans: "Khá"
      },
      {
        value: "3",
        label: "Average",
        trans: "Trung bình"
      },
      {
        value: "4",
        label: "Poor",
        trans: "Kém"
      }
    ]
  },
  {
    title: "The teacher adequately covers the topics required by the syllabus",
    subtitle: "Đảm bảo khối lượng môn học theo chương trình",
    options: [
      {
        value: "1",
        label: "Fully covered",
        trans: "Đảm bảo hoàn toàn"
      },
      {
        value: "2",
        label: "Mostly covered",
        trans: "Đảm bảo phần lớn"
      },
      {
        value: "3",
        label: "Partially covered",
        trans: "Chỉ đảm bảo một phần"
      },
      {
        value: "4",
        label: "Not at all covered",
        trans: "Không đảm bảo"
      }
    ]
  },
  {
    title: "Support from the teacher – guidance for practical exercises, answering questions out side of class",
    subtitle: "Hỗ trợ của giảng viên trong và ngoài giờ – trả lời Email, hướng dẫn thực hành, giải đáp thắc mắc…",
    options: [
      {
        value: "1",
        label: "Very Good",
        trans: "Tốt"
      },
      {
        value: "2",
        label: "Good",
        trans: "Khá"
      },
      {
        value: "3",
        label: "Average",
        trans: "Trung bình"
      },
      {
        value: "4",
        label: "Poor",
        trans: "Kém"
      }
    ]
  },
  {
    title: "Teacher's response to student's questions in class",
    subtitle: "Đáp ứng của giảng viên về những thắc mắc của học viên trong giờ học",
    options: [
      {
        value: "1",
        label: "Answered immediately or just after the session",
        trans: "Trả lời ngay hoặc trả lời vào cuối buổi học"
      },
      {
        value: "2",
        label: "Answered in the next session",
        trans: "Trả lời vào buổi học sau"
      },
      {
        value: "3",
        label: "Some queries left unanswered",
        trans: "Một số câu hỏi không được trả lời"
      },
      {
        value: "4",
        label: "Most queries left unanswered",
        trans: "Phần lớn câu hỏi không được trả lời"
      }
    ]
  },
]