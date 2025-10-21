import React from 'react';

export default function CurrencySelector({ currencySymbol, setCurrencySymbol }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        Currency Symbol
        <span className="ml-2 relative group">
          <svg
            className="inline h-4 w-4 text-gray-400 cursor-pointer"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M9 9V5h2v4h-1v2h1v4h-2v-4h-1v-2h1z M9 3a6 6 0 100 12 6 6 0 000-12z"
            />
          </svg>
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
            Enter the currency symbol (e.g., ₹, $, €)
          </div>
        </span>
      </label>
      <input
        type="text"
        value={currencySymbol}
        onChange={e => setCurrencySymbol(e.target.value)}
        className="mt-1 block w-20 border border-gray-300 rounded p-2 focus:ring-blue-500"
        maxLength={3}
      />
    </div>
  );
}
