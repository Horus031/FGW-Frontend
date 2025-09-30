export type ColumnConfig<T> = {
  key: Extract<keyof T, Array<T> | string | number>;
  title: string;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
    columns: ColumnConfig<T>[];
    data: T[];
    color?: string | "bg-blue-100";
    textSize?: string;
    textColor?: string;
    height?: string;
    bordered?: boolean;
    centered?: boolean;
}

const Table = <T extends object>(props: TableProps<T>) => {
    const { columns, data, color, centered, textSize, textColor, height, bordered } = props

    if (columns.length === 0) {
        return <div>No data available</div>
    }
   

  return (
    <table className={`w-full ${centered === true ? "text-center" : "text-left"} ${bordered ? "rounded-table" : ""} rounded-lg`}>
      <thead className={`${color || "bg-blue-100"}`}>  
        <tr className={`${textColor ? textColor : "text-primary"} text-base`}>
          {columns.map((col) => (
            <th className="custom-table font-medium" key={col.key} style={{ width: col.width || 'auto' }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr className={`text-primary ${textSize ? textSize : ""} ${height ? height : ""}`} key={rowIdx}>
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