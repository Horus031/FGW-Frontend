type MarkTableProps = {
  table: {
    categories: {
      name: string;
      items: {
        gradeItem: string;
        weight: string;
        value: number;
        comment: string;
      }[];
    }[];
    courseTotal: {
      average: number;
      status: string;
    };
  };
};

const MarkTable = ({ table }: MarkTableProps) => {
  const { categories, courseTotal } = table;

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
      <tbody className="text-primary text-base font-medium border">
        {categories.map((category) =>
          category.items.map((item, itemIndex) => (
            <tr key={itemIndex}>
              {itemIndex === 0 && (
                <td
                  rowSpan={category.items.length}
                  className="table-cell uppercase font-semibold text-primary"
                >
                  {category.name}
                </td>
              )}
              <td className="table-cell uppercase">{item.gradeItem}</td>
              <td className="table-cell">{item.weight}</td>
              <td className="table-cell text-primary">{item.value}</td>
              <td className="table-cell">{item.comment}</td>
            </tr>
          ))
        )}

        <tr className="text-primary font-semibold">
          <td rowSpan={2} className="table-cell uppercase">
            Course Total
          </td>
          <td className="table-cell uppercase">Average</td>
          <td colSpan={3} className="text-left table-cell text-lg">
            {courseTotal.average}
          </td>
        </tr>
        <tr className="text-primary font-semibold">
          <td className="table-cell uppercase">Status</td>
          <td colSpan={3} className="table-cell text-left text-approve text-lg">
            {courseTotal.status}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default MarkTable;

// const MarkTable = () => {
//   return (
//     <table className="rounded-table w-full border border-gray-600 rounded-lg">
//       <thead className="bg-primary">
//         <tr className="text-white text-base">
//           <th className="table-cell font-medium w-[190px]">Grade category</th>
//           <th className="table-cell font-medium w-[190px]">Grade item</th>
//           <th className="table-cell font-medium w-[190px]">Weight</th>
//           <th className="table-cell font-medium w-[190px]">Value</th>
//           <th className="table-cell font-medium w-[190px]">Comment</th>
//         </tr>
//       </thead>
//       <tbody className="text-primary text-base font-medium border h-28">
//         <tr className="">
//             <td rowSpan={5} className="table-cell uppercase font-semibold text-primary">
//                 Final Exam
//             </td>
//             <td className="table-cell uppercase">Listening FE</td>
//             <td className="table-cell">8.0%</td>
//             <td className="table-cell text-primary">8.3</td>
//             <td className="table-cell"></td>
//         </tr>
//         <tr>
//             <td className="table-cell uppercase">Speaking FE</td>
//             <td className="table-cell">25.0%</td>
//             <td className="table-cell text-primary">7.5</td>
//             <td className="table-cell"></td>
//         </tr>
//         <tr>
//             <td className="table-cell uppercase">Writing FE</td>
//             <td className="table-cell">10.0%</td>
//             <td className="table-cell text-primary">7.8</td>
//             <td className="table-cell"></td>
//         </tr>
//         <tr>
//             <td className="table-cell uppercase">Reading FE</td>
//             <td className="table-cell">16.0%</td>
//             <td className="table-cell text-primary">4.5</td>
//             <td className="table-cell"></td>
//         </tr>
//         <tr>
//             <td className="table-cell">Total</td>
//             <td className="table-cell">40.0%</td>
//             <td className="table-cell text-primary">6.5</td>
//             <td className="table-cell"></td>
//         </tr>
//         <tr className="text-primary font-semibold">
//           <td rowSpan={2} className="table-cell uppercase ">
//             Course Total
//           </td>
//           <td className="table-cell uppercase ">Average</td>
//           <td colSpan={3} className="text-left table-cell text-lg">
//             80
//           </td>
//         </tr>
//         <tr className="text-primary font-semibold">
//           <td className="table-cell uppercase ">Status</td>
//           <td colSpan={3} className="table-cell text-left text-approve text-lg">
//             Passed
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// };

// export default MarkTable;
