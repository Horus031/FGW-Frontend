export type ColumnConfig = {
  key: string;
  title: string;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
};

type TableProps = {
    columns: ColumnConfig[];
    data: Array<Record<string, any>>;
    color?: string | "bg-blue-100";
}

const Table = (props: TableProps) => {
    const { columns, data, color } = props

    if (columns.length === 0) {
        return <div>No data available</div>
    }
   

    console.log(data);
  return (
    <table className="w-full text-left rounded-lg">
      <thead className={`${color || "bg-blue-100"}`}>  
        <tr className="text-primary text-sm font-medium">
          {columns.map((col) => (
            <th className="custom-table" key={col.key} style={{ width: col.width || 'auto' }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr className="text-primary" key={rowIdx}>
            {columns.map((col) => (
              <td className="custom-table" key={col.key}>
                {col.render
                  ? col.render(row[col.key], row)
                  : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
        {/* <tr className="text-primary">
            <td className="custom-table">1</td>
            <td className="custom-table w-fit">
                
            </td>
            <td className="custom-table">
                GCS230351
            </td>
            <td className="custom-table">
                nghiavmgcs230351@fpt.edu.vn
            </td>
            <td className="custom-table">
                Transfer from COS1203, different schedule
            </td>
        </tr> */}
      </tbody>
    </table>
  )
}

export default Table