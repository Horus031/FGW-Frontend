const MarkTable = () => {
  return (
    <table className="rounded-table w-full border border-gray-600 rounded-lg">
      <thead className="bg-primary">
        <tr className="text-white text-base">
          <th className="table-cell font-medium w-[190px]">Grade category</th>
          <th className="table-cell font-medium w-[190px]">Grade item</th>
          <th className="table-cell font-medium w-[190px]">Weight</th>
          <th className="table-cell font-medium w-[190px]">Value</th>
          <th className="table-cell font-medium w-[190px]">Comment</th>
        </tr>
      </thead>
      <tbody className="text-primary text-base font-medium border h-28">
        <tr className="">
            <td rowSpan={5} className="table-cell uppercase font-semibold text-primary">
                Final Exam
            </td>
            <td className="table-cell uppercase">Listening FE</td>
            <td className="table-cell">8.0%</td>
            <td className="table-cell text-primary">8.3</td>
            <td className="table-cell"></td>
        </tr>
        <tr>
            <td className="table-cell uppercase">Speaking FE</td>
            <td className="table-cell">25.0%</td>
            <td className="table-cell text-primary">7.5</td>
            <td className="table-cell"></td>
        </tr>
        <tr>
            <td className="table-cell uppercase">Writing FE</td>
            <td className="table-cell">10.0%</td>
            <td className="table-cell text-primary">7.8</td>
            <td className="table-cell"></td>
        </tr>
        <tr>
            <td className="table-cell uppercase">Reading FE</td>
            <td className="table-cell">16.0%</td>
            <td className="table-cell text-primary">4.5</td>
            <td className="table-cell"></td>
        </tr>
        <tr>
            <td className="table-cell">Total</td>
            <td className="table-cell">40.0%</td>
            <td className="table-cell text-primary">6.5</td>
            <td className="table-cell"></td>
        </tr>
        <tr className="text-primary font-semibold">
          <td rowSpan={2} className="table-cell uppercase ">
            Course Total
          </td>
          <td className="table-cell uppercase ">Average</td>
          <td colSpan={3} className="text-left table-cell text-lg">
            80
          </td>
        </tr>
        <tr className="text-primary font-semibold">
          <td className="table-cell uppercase ">Status</td>
          <td colSpan={3} className="table-cell text-left text-approve text-lg">
            Passed
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MarkTable;
