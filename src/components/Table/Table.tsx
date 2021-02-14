import React from "react";
import { useTable, Column } from "react-table";
import classNames from "classnames";

interface ITable<TData extends object = any> {
  columns: Array<Column<TData>>;
  data: TData[];
  className?: string;
  empty?: JSX.Element;
}

export default React.memo(Table, (prev, current) => prev === current);

function Table({ columns, data, className, empty }: ITable) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <div
      className={classNames(
        "shadow overflow-hidden border-b border-gray-200 sm:rounded-lg",
        className
      )}
    >
      <table
        className="min-w-full divide-y divide-gray-200"
        {...getTableProps()}
      >
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          className="bg-white divide-y divide-gray-200"
          {...getTableBodyProps()}
        >
          {rows.length ? (
            rows.map((row, _key) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={cell.value}
                        className="px-6 py-4 whitespace-nowrap"
                        {...cell.getCellProps()}
                      >
                        <div className="grid place-items-center">
                          {cell.render("Cell")}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length}>{empty}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
