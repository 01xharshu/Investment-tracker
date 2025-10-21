import React from 'react';

export default function InvestmentRow({ index, data, onChange, onRemove, errors }) {
  const { amount, ratePercent, freq } = data;
  const err = errors?.[index] || {};

  return (
    <div className="investment-item flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0 items-end mb-4">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Investment Amount
          <span className="ml-2 relative group">
            <svg className="inline h-4 w-4 text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 9V5h2v4h-1v2h1v4h-2v-4h-1v-2h1z M9 3a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Enter the initial investment amount (₹ or your currency).
            </div>
          </span>
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={amount}
          onChange={e => onChange(index, 'amount', e.target.value)}
          className={`mt-1 block w-full border rounded p-2 focus:ring-blue-500
            ${err.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
          placeholder="e.g., 10000"
        />
        {err.amount && <p className="text-xs text-red-600 mt-1">{err.amount}</p>}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Annual Interest Rate (%)
          <span className="ml-2 relative group">
            <svg className="inline h-4 w-4 text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 9V5h2v4h-1v2h1v4h-2v-4h-1v-2h1z M9 3a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              Annual interest rate in percent (e.g., 5 for 5%).
            </div>
          </span>
        </label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={ratePercent}
          onChange={e => onChange(index, 'ratePercent', e.target.value)}
          className={`mt-1 block w-full border rounded p-2 focus:ring-blue-500
            ${err.ratePercent ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
          placeholder="e.g., 5"
        />
        {err.ratePercent && <p className="text-xs text-red-600 mt-1">{err.ratePercent}</p>}
      </div>

      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          Compounding Frequency
          <span className="ml-2 relative group">
            <svg className="inline h-4 w-4 text-gray-400 cursor-pointer" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 9V5h2v4h-1v2h1v4h-2v-4h-1v-2h1z M9 3a6 6 0 100 12 6 6 0 000-12z" />
            </svg>
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              How many times per year interest is compounded (1=annually,4=quarterly,12=monthly).
            </div>
          </span>
        </label>
        <select
          value={freq}
          onChange={e => onChange(index, 'freq', e.target.value)}
          className={`mt-1 block w-full border rounded p-2 focus:ring-blue-500
            ${err.freq ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
        >
          <option value="1">Annually (1)</option>
          <option value="4">Quarterly (4)</option>
          <option value="12">Monthly (12)</option>
        </select>
        {err.freq && <p className="text-xs text-red-600 mt-1">{err.freq}</p>}
      </div>

      <div className="flex-none">
        <button
          type="button"
          className="text-red-600 hover:text-red-800 mt-1"
          onClick={() => onRemove(index)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
