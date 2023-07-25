// components/ReportTable.js
import React from "react";
import data from "../data";

export default function ReportTable({ cookieStands }) {
    const getRandomData = () => {
        const randomData = [];
        let sum = 0;
        for (let i = 0; i < 14; i++) {
            const randomValue = data[Math.floor(Math.random() * data.length)];
            randomData.push(randomValue);
            sum += randomValue;
        }
        return { data: randomData, sum };
    };

    const tableData = cookieStands.map((stand) => {
        const { data: randomData, sum } = getRandomData();
        return { location: stand.location, data: randomData, total: sum };
    });

    const totalData = Array.from({ length: 14 }, (_, index) => {
        const sum = tableData.reduce((acc, curr) => acc + curr.data[index], 0);
        return sum;
    });

    const totalSum = totalData.reduce((acc, curr) => acc + curr, 0);

    return (
        <div>
            <h2 className="text-2xl font-bold mt-8">Report Table</h2>
            {cookieStands.length === 0 ? (
                <h2 className="text-2xl font-bold mt-8">No Cookie Stands Available</h2>
            ) : (
                <table className="w-full border-collapse mt-4 bg-lime-300">
                    <thead>
                        <tr>
                            <th className="border p-2">Location</th>
                            <th className="border p-2">6.am</th>
                            <th className="border p-2">7.am</th>
                            <th className="border p-2">8.am</th>
                            <th className="border p-2">9.am</th>
                            <th className="border p-2">10.am</th>
                            <th className="border p-2">11.am</th>
                            <th className="border p-2">12.pm</th>
                            <th className="border p-2">1.pm</th>
                            <th className="border p-2">2.pm</th>
                            <th className="border p-2">3.pm</th>
                            <th className="border p-2">4.pm</th>
                            <th className="border p-2">5.pm</th>
                            <th className="border p-2">6.pm</th>
                            <th className="border p-2">7.pm</th>
                            <th className="border p-2">Totals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((rowData, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                                <td className="border p-2">{rowData.location}</td>
                                {rowData.data.map((value, i) => (
                                    <td key={i} className="border p-2">
                                        {value}
                                    </td>
                                ))}
                                <td className="border p-2">{rowData.total}</td>
                            </tr>
                        ))}
                        <tr className="bg-lime-300">
                            <td className="border p-2">Total</td>
                            {totalData.map((value, i) => (
                                <td key={i} className="border p-2">
                                    {value}
                                </td>
                            ))}
                            <td className="border p-2">{totalSum}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
}
