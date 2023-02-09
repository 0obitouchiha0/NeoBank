import React from 'react';
import { payment } from '../../pages/schedule/SchedulePage';
import arrowDown from '../../assets/pagesImages/schedulePage/arrowDown.svg';
import arrowUp from '../../assets/pagesImages/schedulePage/arrowUp.svg';
import styles from './styles.module.scss';

const columnHeaders = [
    {
        title: 'NUMBER',
        columnName: 'number'
    },
    {
        title: 'DATE',
        columnName: 'date'
    },
    {
        title: 'TOTAL PAYMENT',
        columnName: 'totalPayment'
    },
    {
        title: 'INTEREST PAYMENT',
        columnName: 'interestPayment'
    },
    {
        title: 'DEBT PAYMENT',
        columnName: 'debtPayment'
    },
    {
        title: 'REMAINING DEBP',
        columnName: 'remainingDebt'
    }
];

interface TableProps {
    table: payment[]
}

export default function Table({table}: TableProps) {
    const [columnSort, setColumnSort] = React.useState<Record<string, number>>({
        number: -1,
        date: -1,
        totalPayment: -1,
        interestPayment: -1,
        debtPayment: -1,
        remainingDebt: -1,
    });
    const [sortedTable, setSortedTable] = React.useState(table);

    React.useEffect(() => {
        setSortedTable(table);
    }, [table]);

    function changeSortHandler(column: string) {
        setColumnSort(prev => ({...prev, [column]: -prev[column]}));
        setSortedTable(prev => {
            if(column === 'date') return prev.sort((a, b) => (new Date(a[column as keyof payment]).getTime() - new Date(b[column as keyof payment]).getTime()) * columnSort[column]);
            return prev.sort((a, b) => (+a[column as keyof payment] - +b[column as keyof payment]) * -columnSort[column]);
        });
    }

    return (
        <table className={styles.table}>
            <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                    {columnHeaders.map(header => (
                        <th key={header.title} className={styles.th} onClick={() => changeSortHandler(header.columnName)}>
                            <span>{header.title}</span>
                            <img src={columnSort[header.columnName] === 1 ? arrowDown : arrowUp} alt="arrow" />
                        </th>
                    ))}
                </tr>
                {sortedTable.map(row => (
                    <tr key={row.number} className={styles.tr}>
                        {Object.keys(row).map(cell => (
                            <td key={cell} className={styles.td}>
                                {row[cell as keyof typeof row]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
