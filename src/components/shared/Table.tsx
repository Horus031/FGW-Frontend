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
  schedule?: boolean;
  feedback?: boolean;
  activity?: boolean;
  grade?: boolean;
};

const Table = <T extends object>(props: TableProps<T>) => {
  const {
    columns,
    data,
    color,
    centered,
    textSize,
    textColor,
    height,
    schedule,
    padding,
    feedback,
    bordered,
    activity,
    grade,
  } = props;

  if (columns.length === 0) {
    return <div>No data available</div>;
  }

  return (
    <table
      className={`${activity === true ? "lg:w-fit lg:scale-[99.1%] lg:origin-top-left xl:scale-100 xl:w-full overflow-x-hidden xl:whitespace-nowrap" : "w-full"} ${
      centered === true ? "text-center" : "text-left"
      } rounded-table rounded-lg`}
    >
      <thead className={`${color || "bg-primary"}`}>
      <tr
        className={`${textColor ? textColor : "text-white"} ${
        height ? height : ""
        } ${textSize ? textSize : "text-base"}`}
      >
        {columns.map((col) => (
        <th
          className={`font-medium ${
          padding ? `${padding}` : "custom-table py-2"
          } ${bordered ? "border border-[#D2D6DB]" : ""}`}
          key={col.key}
          style={{ width: col.width || "auto" }}
        >
          {col.title}
        </th>
        ))}
      </tr>
      </thead>
      <tbody>
      {data.map((row, rowIdx) => (
        <tr
        className={`text-primary ${textSize ? textSize : ""} ${
          height ? height : ""
        } ${
          schedule || feedback
          ? rowIdx % 2 !== 0
            ? "bg-[#F0F0F0]"
            : ""
          : ""
        }`}
        key={rowIdx}
        >
        {columns.map((col) => (
          <td
          className={`${feedback || grade ? "font-medium" : ""}  ${
            padding ? `${padding}` : "custom-table"
          } ${bordered ? "border border-[#D2D6DB]" : ""}`}
          key={String(col.key)}
          >
          {col.render
            ? col.render(row[col.key], row)
            : (row[col.key] as React.ReactNode)}
          </td>
        ))}
        </tr>
      ))}
      {feedback && (
        <tr
        className={`text-primary ${
          textSize ? textSize : ""
        } h-18 bg-[#F0F0F0]`}
        >
        <td
          colSpan={2}
          className={`${
          padding ? `${padding} border border-[#D2D6DB]` : "custom-table"
          } font-bold`}
        >
          Total GPA
        </td>
        <td
          colSpan={6}
          className={`${
          padding ? `${padding} border border-[#D2D6DB]` : "custom-table"
          } font-semibold `}
        >
          4
        </td>
        </tr>
      )}
      </tbody>
    </table>
  );
};

export default Table;
