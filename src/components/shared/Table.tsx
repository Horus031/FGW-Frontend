export type ColumnConfig<T> = {
  key: Extract<keyof T, Array<T> | string | number>;
  title: string | React.ReactNode;
  width?: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type TableProps<T> = {
    columns: ColumnConfig<T>[];
    data: T[];
    color?: string | "bg-blue-100";
    textSize?: string;
    textColor?: string;
    padding?: string;
    height?: string;
    bordered?: boolean;
    centered?: boolean;
    schedule?: boolean
}

const Table = <T extends object>(props: TableProps<T>) => {
    const { columns, data, color, centered, textSize, textColor, height, schedule, padding } = props

    if (columns.length === 0) {
        return <div>No data available</div>
    }
   

  return (
    <table className={`w-full ${centered === true ? "text-center" : "text-left"} rounded-table rounded-lg`}>
      <thead className={`${color || "bg-primary"}`}>  
        <tr className={`${textColor ? textColor : "text-white"} text-base`}>
          {columns.map((col) => (
            <th className={`font-medium ${padding ? `${padding} border border-[#D2D6DB]` : "custom-table py-2"}`} key={col.key} style={{ width: col.width || 'auto' }}>
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr className={`text-primary ${textSize ? textSize : ""} ${height ? height : ""} ${schedule ? rowIdx % 2 !== 0 ? "bg-[#FAFAFA]" : "" : ""}`} key={rowIdx}>
            {columns.map((col) => (
              <td className={`${padding ? `${padding} border border-[#D2D6DB]` : "custom-table"}`} key={String(col.key)}>
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