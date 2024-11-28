import { useMemo } from 'react';
import { useTable } from '@tanstack/react-table';
import { ColumnDef, Table } from '@tanstack/react-table';
import { useState } from 'react';

const PropertiesTable = () => {
  const data = useMemo(
    () => [
      { id: 1, name: 'Property 1', category: 'Category 1' },
      { id: 2, name: 'Property 2', category: 'Category 2' },
    ],
    []
  );

  const columns = useMemo<ColumnDef<any, any>[]>(
    () => [
      { header: 'Name', accessorKey: 'name' },
      { header: 'Category', accessorKey: 'category' },
      {
        header: 'Actions',
        cell: ({ row }) => (
          <div>
            <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
            <button className="text-red-600 hover:text-red-800">Delete</button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useTable({ data, columns });

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <table className="min-w-full text-left">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th key={column.id} className="px-4 py-2">{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">{cell.render('Cell')}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertiesTable;
