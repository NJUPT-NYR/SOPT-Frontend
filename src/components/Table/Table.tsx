import React from "react";
import { useTable, Column, useBlockLayout } from "react-table";
import classNames from "classnames";
import { IBaseComponent } from "../base";

const defaultColumn = {
  minWidth: 30,
  width: 150,
  maxWidth: 400,
};

interface ITable<TData extends object = any> extends IBaseComponent {
  columns: Array<Column<TData>>;
  data: TData[];
  empty?: JSX.Element;
  rowSelect?: boolean;
  onRowSelect?: (row: TData) => void;
}

export default React.memo(Table, (prev, current) => prev === current);

function Table(props: ITable) {
  const { columns, data, className, empty } = props;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data, defaultColumn }, useBlockLayout);

  return (
    <div
      className={classNames(
        "shadow border-b border-gray-200 sm:rounded-lg",
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
              {headerGroup.headers.map((column) => {
                return (
                  <th
                    key={column.id}
                    scope="col"
                    className="px-3 py-1 text-center text-xs font-medium text-gray-500 uppercase tracking-wider  "
                    {...column.getHeaderProps()}
                  >
                    {column.render("Header")}
                  </th>
                );
              })}
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
                <tr
                  className={classNames({
                    "cursor-pointer hover:bg-gray-100": props.rowSelect,
                  })}
                  onClick={() => {
                    props?.onRowSelect?.(row);
                  }}
                  key={row.id}
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        key={cell.value}
                        className="px-2 py-2 whitespace-nowrap overflow-hidden overflow-ellipsis"
                        {...cell.getCellProps()}
                      >
                        {cell.render("Cell")}
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
