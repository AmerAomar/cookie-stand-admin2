import React from "react";
import { FaTrash } from "react-icons/fa";

export default function ReportTable({ cookieStands, onDeleteCookieStand }) {
  const totalData = Array.from({ length: 14 }, (_, index) => {
    const sum = cookieStands.reduce((acc, stand) => acc + stand.hourly_sales[index], 0);
    return sum;
  });

  const totalSum = totalData.reduce((acc, curr) => acc + curr, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8 pb-5">Report Table</h2>
      {cookieStands.length === 0 ? (
        <h2 className="text-2xl font-bold mt-8">No Cookie Stands Available</h2>
      ) : (
        <div className="table-container overflow-auto">
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
              {cookieStands.map((rowData, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <td className="border p-2">
                    {rowData.location}
                    <button onClick={() => onDeleteCookieStand(rowData.id)}>
                      <FaTrash className="ml-2 h-5 w-5 text-red-500 cursor-pointer" />
                    </button>
                  </td>
                  {rowData.hourly_sales.map((value, i) => (
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
        </div>
      )}

      <style jsx>{`
        table {
          table-layout: fixed;
        }

        td,
        th {
          word-wrap: break-word;
          /* Adjust this value based on your preference */
        }

        .table-container {
          max-height: 400px;
        }
      `}</style>
    </div>
  );
}
