const MarkTable = () => {
  return (
    <table className="rounded-table w-full border border-gray-600 rounded-lg">
      <thead className="bg-gray-200/25">
        <tr className="text-gray-600 text-base font-bold">
          <th className="table-cell font-semibold">Grade category</th>
          <th className="table-cell font-semibold">Grade item</th>
          <th className="table-cell font-semibold">Weight</th>
          <th className="table-cell font-semibold">Value</th>
          <th className="table-cell font-semibold">Comment</th>
        </tr>
      </thead>
      <tbody className="text-primary text-base font-bold border h-28">
        <tr className="">
            <td rowSpan={5} className="table-cell uppercase font-medium">
                Final Exam
            </td>
            <td className="table-cell uppercase font-medium">Listening FE</td>
            <td className="table-cell font-medium">8.0%</td>
            <td className="table-cell font-medium">8.3</td>
            <td className="table-cell font-medium"></td>
        </tr>
        <tr>
            <td className="table-cell uppercase font-medium">Speaking FE</td>
            <td className="table-cell font-medium">25.0%</td>
            <td className="table-cell font-medium">7.5</td>
            <td className="table-cell font-medium"></td>
        </tr>
        <tr>
            <td className="table-cell uppercase font-medium">Writing FE</td>
            <td className="table-cell font-medium">10.0%</td>
            <td className="table-cell font-medium">7.8</td>
            <td className="table-cell font-medium"></td>
        </tr>
        <tr>
            <td className="table-cell uppercase font-medium">Reading FE</td>
            <td className="table-cell font-medium">16.0%</td>
            <td className="table-cell font-medium">4.5</td>
            <td className="table-cell font-medium"></td>
        </tr>
        <tr>
            <td className="table-cell font-medium">Total</td>
            <td className="table-cell font-medium">40.0%</td>
            <td className="table-cell font-medium">6.5</td>
            <td className="table-cell font-medium"></td>
        </tr>
        <tr className="">
          <td rowSpan={2} className="table-cell uppercase font-medium">
            Course Total
          </td>
          <td className="table-cell uppercase">Average</td>
          <td colSpan={3} className="text-left table-cell text-lg">
            80
          </td>
        </tr>
        <tr>
          <td className="table-cell uppercase">Status</td>
          <td colSpan={3} className="table-cell text-left text-approve text-lg">
            Passed
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MarkTable;
