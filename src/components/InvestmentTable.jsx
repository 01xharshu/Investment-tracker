import React from 'react';

export default function InvestmentTable({ labels, perInvValues, totalRealValues, currencySymbol }) {
  return (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
            {perInvValues.map((_, idx) => (
              <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Inv #{idx+1} value
              </th>
            ))}
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total (Inflation-adj.)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {labels.map((year, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 whitespace-nowrap">{year}</td>
              {perInvValues.map((arr, j) => (
                <td key={j} className="px-6 py-4 whitespace-nowrap">
                  {currencySymbol}{arr[idx].toFixed(2)}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap">
                {currencySymbol}{totalRealValues[idx].toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
