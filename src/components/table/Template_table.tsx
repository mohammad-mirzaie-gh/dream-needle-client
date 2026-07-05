import React from "react";

function Table_users<TRow extends { _id: string }>({
  headers,
  data,
  Box,
}: {
  headers: string[];
  data: TRow[];
  Box: React.ComponentType<{ data: TRow }>;
}) {
  return (
    <div className="parent_custom_table overflow-x-auto whitespace-nowrap w-full relative">
      <table className="custom-table w-full min-w-[600px]">
        <thead className="pb-5">
          <tr className="bg-colorTheme text-white">
            {headers.map((i , index) => (
              <th key={index} className="p-[20px] px-[10px] text-start">{i}</th>
            ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {data?.map((i) => (
            <Box key={i._id} data={i} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table_users;
