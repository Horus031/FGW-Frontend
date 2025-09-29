export type ColumnConfig<T> = {
  key: Extract<keyof T, string | number>;
  title: string;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
    columns: ColumnConfig<T>[];
    data: T[];
    color?: string | "bg-blue-100";
    centered?: boolean;
}

const Table = <T extends object>(props: TableProps<T>) => {
    const { columns, data, color, centered } = props

    if (columns.length === 0) {
        return <div>No data available</div>
    }
   

  return (
    <table className={`w-full ${centered === true ? "text-center" : "text-left"} rounded-lg`}>
      <thead className={`${color || "bg-blue-100"}`}>  
        <tr className="text-primary text-base font-medium">
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
              <td className="custom-table" key={String(col.key)}>
                {col.render
                  ? col.render(row[col.key], row)
                  : (row[col.key] as React.ReactNode)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table