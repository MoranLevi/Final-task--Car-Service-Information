import React, { useEffect } from 'react';
import { Cell, Column, Row, useGlobalFilter, useSortBy, useTable } from 'react-table';
import './ReactTable.css';


const ReactTable = ({
    columns,
    data = [],
    placeholder = <></>,
    onTableRowClick = () => {},
    onTableDoubleClick = () => {},
    getTableRowCSS = () => '',
    filterString = ''
}) => {

    // Hooks
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setGlobalFilter } =
        // useTable({ columns, data, autoResetSortBy: false }, useGlobalFilter, useSortBy) as any;
        useTable({ columns, data }, useGlobalFilter, useSortBy);

    // Listen for input changes outside
    useEffect(() => {
        setGlobalFilter(filterString);
    }, [filterString, data]);

    return (
        <div className="table-container">
        {data.length === 0 ? (
            placeholder
        ) : (
            <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {column.render('Header')}
                        <span> {column.isSorted ? (column.isSortedDesc ? '🔼' : '🔽') : ''}</span>{' '}
                    </th>
                    ))}
                </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                prepareRow(row);
                return (
                    <tr
                    {...row.getRowProps()}
                    className={getTableRowCSS(row)}
                    onClick={() => onTableRowClick(row)}
                    onDoubleClick={() => onTableDoubleClick(row)}
                    >
                    {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
        )}
        </div>
    );
};

export default ReactTable;
