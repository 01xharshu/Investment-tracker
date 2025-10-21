import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function GrowthChart({ labels, perInvValues, totalRealValues, currencySymbol }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const datasets = perInvValues.map((arr, idx) => ({
      label: `Inv #${idx+1}`,
      data: arr,
      borderWidth: 2,
      fill: false
    }));
    datasets.push({
      label: 'Total (inflation-adj.)',
      data: totalRealValues,
      borderWidth: 3,
      borderDash: [5,5],
      fill: false
    });

    const ctx = canvasRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Growth of Investments Over Time' },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) {
                  label += currencySymbol + context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          y: {
            ticks: {
              callback: value => currencySymbol + value
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [labels, perInvValues, totalRealValues, currencySymbol]);

  return (
    <div className="w-full h-64 sm:h-96 mb-6">
      <canvas ref={canvasRef} />
    </div>
  );
}
