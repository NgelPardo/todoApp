import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { columnDef } from '../../data/columnsDef';
import { useMemo, useState } from 'react';
import './Table.css'
import { useTodoStore } from '../../hooks' 

export const Table = ({ onModify, onDelete }) => {

    const [ rowSelection, setRowSelection ] = useState({});
    const { todos, searchState, setSearchTodo } = useTodoStore();
    const finalData = useMemo(() => todos, [todos]);
    const finalColumnDef = useMemo(() => columnDef, []);
    const [sorting, setSorting] = useState([]);
    const tableInstance = useReactTable({
        columns: finalColumnDef,
        data: finalData,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
          sorting,
          globalFilter: searchState,
          rowSelection: rowSelection,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setSearchTodo,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        enableRowSelection: true,
    });

  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          { tableInstance.getHeaderGroups().map( headerElement => {
            return <tr key={ headerElement.id }>{ headerElement.headers.map( columnElement => {
              return (
                <th 
                  key={ columnElement.id } 
                  colSpan={ columnElement.colSpan } 
                  onClick={ columnElement.column.getToggleSortingHandler() }
                  style={{ cursor: 'pointer' }}
                >
                  { flexRender(
                    columnElement.column.columnDef.header,
                    columnElement.getContext()
                  ) }
                  {(() => {
                    const sorting = columnElement.column.getIsSorted();
                    if (sorting.length > 0) {
                      return (
                        <div className="d-inline-flex" style={{ marginLeft: "5px" }}>
                          {sorting === 'desc' ? (
                            <i className="fa-solid fa-sort-down"></i>
                          ) : (
                            <i className="fa-solid fa-sort-up"></i>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div className="d-inline-flex" style={{ marginLeft: "5px" }}>
                          <i className="fa-solid fa-sort"></i>
                        </div>
                      );
                    }
                  })()}
                </th>
              )
            }) }
            <th>Acciones</th>
            </tr>
          })}
        </thead>
        <tbody>
          { tableInstance.getRowModel().rows.map(rowElement => {
            return <tr key={ rowElement.id }>
              { rowElement.getVisibleCells().map( cellElement => {
                const columnDef = cellElement.column.columnDef;
                const cellValue = cellElement.row.original.estado;
                const isEstadoColumn = columnDef.accessorKey === 'estado';
                
                let columnStyle = {};
                
                if (isEstadoColumn) {
                  switch (cellValue) {
                    case 'Pendiente':
                      columnStyle = { backgroundColor: '#6c757d', color: '#fff', fontSize: '13px' };
                      break;
                    case 'Cancelada':
                      columnStyle = { backgroundColor: '#ca3442', color: '#fff', fontSize: '13px' };
                      break;
                    case 'Completa':
                      columnStyle = { backgroundColor: '#198754', color: '#fff', fontSize: '13px' };
                      break;
                    // Agrega más casos según sea necesario
                    default:
                      // Estilo por defecto si no coincide con ninguno de los casos anteriores
                      columnStyle = {};
                      break;
                  }
                }
                return <td key={ cellElement.id }>
                    <span style={columnStyle} className='p-1 span-table'>
                    {
                        flexRender(cellElement.column.columnDef.cell, cellElement.getContext() )
                    }
                    </span>
                </td>
              }) }
              <td>
                <button
                    type='button' 
                    className='btn btn-warning' 
                    style={{ marginRight: '10px' }}
                    onClick={(event) => onModify( event, rowElement.original )}
                >
                    <i className='fa-solid fa-pen-to-square'></i>
                </button>
                <button
                    type='button' 
                    className='btn btn-danger'
                    onClick={(event) => onDelete( event, rowElement.original )}
                >
                    <i className='fa-solid fa-trash-can'></i>
                </button>
              </td>
            </tr>
            }) }
        </tbody>
      </table>
    </div>
    <hr />
    <div className="adm-page">
      <button 
        onClick={() => tableInstance.previousPage() } 
        disabled={ !tableInstance.getCanPreviousPage() }
        className="btn-prev"
      >
        {"<"}
      </button>
      <span style={{ fontSize: "12px" }}>
        {tableInstance.getState().pagination.pageIndex + 1} de{" "} {tableInstance.getPageCount()}
      </span>
      <button 
        onClick={() => tableInstance.nextPage() }
        disabled={ !tableInstance.getCanNextPage() }
        className="btn-next"
      >
        {">"}
      </button>
    </div>
    </>
  )
}
