import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../partials/Header';
import PhMonitor from '../partials/dashboard/PhMonitor';
import HumidityMonitor from '../partials/dashboard/HumidityMonitor';
import TdsMonitor from '../partials/dashboard/TdsMonitor';
import KelembapanMonitor from '../partials/dashboard/KelembapanMonitor';
import SuhuMonitor from '../partials/dashboard/SuhuMonitor';

function ToggleSwitch({ isOn, onToggle, label, onLabelChange }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center">
      <input
        type="text"
        className="bg-transparent border-none outline-none text-center w-full text-gray-800 dark:text-gray-100 font-semibold"
        value={label}
        onChange={(e) => onLabelChange(e.target.value)}
      />
      <label className="relative inline-block w-16 h-8">
        <input type="checkbox" className="opacity-0 w-0 h-0" checked={isOn} onChange={onToggle} />
        <span className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-colors duration-300 ease-in-out rounded-full 
          ${isOn ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <span className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
            ${isOn ? 'transform translate-x-8' : ''}`}></span>
        </span>
      </label>
      <span className="mt-1 text-sm text-gray-700 dark:text-gray-300">{isOn ? 'ON' : 'OFF'}</span>
    </div>
  );
}

function Dashboard() {
  const [relayStates, setRelayStates] = useState([]);
  const [relayInfo, setRelayInfo] = useState([]);

  useEffect(() => {
    const fetchRelayData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/relay');
        if (response.data) {
          setRelayInfo(response.data.map(r => ({ id: r.id, description: r.description })));
          setRelayStates(response.data.map(r => r.value === "on"));
        }
      } catch (error) {
        console.error("Error fetching relay data:", error.message);
      }
    };
    fetchRelayData();
    const interval = setInterval(fetchRelayData, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleToggle = async (index) => {
    const newStates = [...relayStates];
    newStates[index] = !newStates[index];
    setRelayStates(newStates);
    try {
      await axios.patch(`http://localhost:5000/relay/${relayInfo[index].id}`, {
        value: newStates[index] ? "on" : "off",
      });
    } catch (error) {
      console.error("Error updating relay status:", error.message);
    }
  };

  const handleLabelChange = async (index, newLabel) => {
    try {
      await axios.patch(`http://localhost:5000/relay/${relayInfo[index].id}`, { description: newLabel });
      const updatedRelays = [...relayInfo];
      updatedRelays[index].description = newLabel;
      setRelayInfo(updatedRelays);
    } catch (error) {
      console.error("Error updating relay label:", error.message);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full  mx-auto">
            <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Dashboard</h1>
            <div className="grid grid-cols-12 gap-6">
              <HumidityMonitor />
              <KelembapanMonitor />
              <PhMonitor />
              <TdsMonitor />
              <SuhuMonitor />
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relayInfo.map((relay, index) => (
                <ToggleSwitch
                  key={relay.id}
                  label={relay.description}
                  isOn={relayStates[index]}
                  onToggle={() => handleToggle(index)}
                  onLabelChange={(newLabel) => handleLabelChange(index, newLabel)}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;