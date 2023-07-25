import React, { useState, useRef } from "react";

export default function CreateForm({ addCookieStand }) {
  const [error, setError] = useState("");

  const locationRef = useRef();
  const minimumRef = useRef();
  const maximumRef = useRef();
  const averageRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const locationValue = locationRef.current.value;
    const minimumValue = minimumRef.current.value;
    const maximumValue = maximumRef.current.value;
    const averageValue = averageRef.current.value;

    // Check if any input fields are empty
    if (!locationValue || !minimumValue || !maximumValue || !averageValue) {
      setError("Please fill in all input fields.");
      return;
    }

    const newCookieStand = {
      location: locationValue,
      minimum: parseFloat(minimumValue),
      maximum: parseFloat(maximumValue),
      average: parseFloat(averageValue),
    };

    addCookieStand(newCookieStand);

    event.target.reset();
    setError("");
  };

  return (
    <form className="bg-green-300 p-6 rounded-lg shadow-md max-w-2xl w-full mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4 text-center">Create Cookie Stand</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        <label htmlFor="location " className="block text-gray-700 font-semibold"> Location </label>
        <input ref={locationRef} name="location" id="location" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"/>
      </div>

      <div className="flex flex-col sm:flex-row mb-1 gap-4">
        <div className="flex flex-col">
          <label htmlFor="min-customers" className="block text-gray-700 font-semibold">
            Minimum Customers per Hour
          </label>
          <input
            ref={minimumRef}
            name="minimum"
            id="min-customers"
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max-customers" className="block text-gray-700 font-semibold">
            Maximum Customers per Hour
          </label>
          <input
            ref={maximumRef}
            name="maximum"
            id="max-customers"
            type="number"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="avg-cookies" className="block text-gray-700 font-semibold">
            Average Cookies per Sale
          </label>
          <input
            ref={averageRef}
            name="average"
            id="avg-cookies"
            type="number"
            step="0.1"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full sm:w-auto bg-green-500 text-black font-bold px-4 py-2 rounded-md hover:bg-green-600 transition-all"
        >
          Create Cookie
        </button>
      </div>
    </form>
  );
}
