import React, { useState, useEffect } from 'react';
import { chartAreaGradient } from '../../charts/ChartjsConfig';
import RealtimeChart from '../../charts/RealtimeChart';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';
import axios from 'axios';

function PhMonitor() {
  const [data, setData] = useState([]);
  const [labels, setLabels] = useState([]);

  const fetchPhData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ph`);
      const fetchedData = response.data;
      if (fetchedData && fetchedData.length > 0) {
        fetchedData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        setData(fetchedData.map(item => item.value));
        setLabels(fetchedData.map(item => new Date(item.timestamp)));
      } else {
      }
    } catch (error) {
      console.error('Error fetching pH data:', error);
    }
  };

  useEffect(() => {
    fetchPhData();
    const interval = setInterval(() => {
      fetchPhData();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = {
    labels: labels.map(label => label.toLocaleTimeString()),
    datasets: [
      {
        data: data,
        fill: true,
        backgroundColor: (context) => {
          const { ctx, chartArea } = context.chart;
          if (!chartArea) {
            return `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)`;
          }
          return chartAreaGradient(ctx, chartArea, [
            { stop: 0, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0)` },
            { stop: 1, color: `rgba(${hexToRGB(tailwindConfig().theme.colors.violet[500])}, 0.2)` },
          ]);
        },
        borderColor: tailwindConfig().theme.colors.violet[500],
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 3,
        pointBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointHoverBackgroundColor: tailwindConfig().theme.colors.violet[500],
        pointBorderWidth: 0,
        pointHoverBorderWidth: 0,
        clip: 20,
        tension: 0.2,
      },
    ],
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-gray-800 shadow-sm rounded-xl">
      <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60 flex items-center">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">pH</h2>
      </header>
      <RealtimeChart data={chartData} width={595} height={248} />
    </div>
  );
}

export default PhMonitor;