function ToggleSwitch({ isOn, onToggle, label }) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col items-center">
        <span className="mb-2 font-semibold text-gray-800 dark:text-gray-100">{label}</span>
        <label className="relative inline-block w-16 h-8">
          <input
            type="checkbox"
            className="opacity-0 w-0 h-0"
            checked={isOn}
            onChange={onToggle}
          />
          <span
            className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 transition-colors duration-300 ease-in-out rounded-full 
            ${isOn ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <span
              className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 
              ${isOn ? 'transform translate-x-8' : ''}`}
            ></span>
          </span>
        </label>
        <span className="mt-1 text-sm text-gray-700 dark:text-gray-300">{isOn ? 'ON' : 'OFF'}</span>
      </div>
    );
  }

  export default ToggleSwitch;