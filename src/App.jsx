import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import CurrencySelector from './components/CurrencySelector';
import InvestmentRow from './components/InvestmentRow';
import InvestmentTable from './components/InvestmentTable';
import GrowthChart from './components/GrowthChart';

function App() {
  const [investments, setInvestments] = useState([
    { amount: '', ratePercent: '', freq: '1' }
  ]);
  const [years, setYears] = useState('10');
  const [inflationPercent, setInflationPercent] = useState('2');
  const [currencySymbol, setCurrencySymbol] = useLocalStorage('currencySymbol', '₹');
  const [calculatedData, setCalculatedData] = useState(null);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  // Load investments from localStorage optionally
  const [savedInv, setSavedInv] = useLocalStorage('investments', null);

  useEffect(() => {
    if (savedInv && Array.isArray(savedInv)) {
      setInvestments(savedInv);
    }
  }, [savedInv]);

  useEffect(() => {
    setSavedInv(investments);
  }, [investments, setSavedInv]);

  const handleAdd = () => {
    setInvestments([...investments, { amount: '', ratePercent: '', freq: '1' }]);
  };

  const handleRemove = index => {
    const newInv = investments.filter((_, i) => i !== index);
    setInvestments(newInv);
    // remove error entry if any
    setErrors(prev => {
      const newErr = { ...prev };
      delete newErr[index];
      return newErr;
    });
  };

  const handleChange = (index, field, value) => {
    const newInv = investments.map((inv, i) => i === index ? { ...inv, [field]: value } : inv);
    setInvestments(newInv);
  };

  const validateInputs = () => {
    const newErrors = {};
    investments.forEach((inv, idx) => {
      const err = {};
      const amount = parseFloat(inv.amount);
      const rate = parseFloat(inv.ratePercent);
      const freq = parseInt(inv.freq);
      if (isNaN(amount) || amount <= 0) err.amount = 'Enter amount > 0';
      if (isNaN(rate) || rate < 0) err.ratePercent = 'Enter rate ≥ 0%';
      if (![1,4,12].includes(freq)) err.freq = 'Select a valid frequency';
      if (Object.keys(err).length > 0) newErrors[idx] = err;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleCalculate = () => {
    setGeneralError('');
    if (!validateInputs()) {
      setGeneralError('Please fix errors above.');
      return;
    }
    const yrs = parseInt(years);
    if (isNaN(yrs) || yrs < 1) {
      setGeneralError('Enter number of years ≥1');
      return;
    }
    const infl = parseFloat(inflationPercent);
    if (isNaN(infl) || infl < 0) {
      setGeneralError('Enter valid inflation rate ≥0%');
      return;
    }
    const inflationRate = infl / 100;

    const invs = investments.map(inv => ({
      amount: parseFloat(inv.amount),
      rate: parseFloat(inv.ratePercent)/100,
      freq: parseInt(inv.freq)
    }));

    const labels = [];
    const perInvValues = invs.map(() => []);
    const totalRealValues = [];

    for (let n = 1; n <= yrs; n++) {
      labels.push(n);
      let nominalTotal = 0;
      invs.forEach((inv, idx) => {
        const val = inv.amount * Math.pow(1 + inv.rate/inv.freq, inv.freq * n);
        perInvValues[idx].push(val);
        nominalTotal += val;
      });
      const realVal = nominalTotal / Math.pow(1 + inflationRate, n);
      totalRealValues.push(realVal);
    }

    setCalculatedData({
      labels,
      perInvValues,
      totalRealValues
    });
  };

  return (
    <div className="bg-gray-100 p-6 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded shadow p-6">
        <h1 className="text-3xl font-semibold mb-6">Investment Returns Calculator</h1>

        <CurrencySelector currencySymbol={currencySymbol} setCurrencySymbol={setCurrencySymbol} />

        {investments.map((inv, idx) => (
          <InvestmentRow
            key={idx}
            index={idx}
            data={inv}
            onChange={handleChange}
            onRemove={handleRemove}
            errors={errors}
          />
        ))}

        <button
          type="button"
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add another investment
        </button>

        <div className="mt-6 mb-4 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Number of years to project</label>
            <input
              type="number"
              min="1"
              value={years}
              onChange={e => setYears(e.target.value)}
              className="mt-1 block w-32 border border-gray-300 rounded p-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Expected annual inflation rate (%)</label>
            <input
              type="number"
              min="0"
              value={inflationPercent}
              onChange={e => setInflationPercent(e.target.value)}
              className="mt-1 block w-32 border border-gray-300 rounded p-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleCalculate}
          className="mt-2 mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Calculate
        </button>

        {generalError && <div className="text-red-600 mb-4">{generalError}</div>}

        {calculatedData && (
          <>
            <InvestmentTable
              labels={calculatedData.labels}
              perInvValues={calculatedData.perInvValues}
              totalRealValues={calculatedData.totalRealValues}
              currencySymbol={currencySymbol}
            />
            <GrowthChart
              labels={calculatedData.labels}
              perInvValues={calculatedData.perInvValues}
              totalRealValues={calculatedData.totalRealValues}
              currencySymbol={currencySymbol}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
