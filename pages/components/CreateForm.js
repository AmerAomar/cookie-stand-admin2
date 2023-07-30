// pages/components/CreateForm.js
import React, { useState, useRef } from "react";

export default function CreateForm({ addCookieStand }) {
  const [error, setError] = useState("");

  const locationRef = useRef();
  const minimumRef = useRef();
  const maximumRef = useRef();
  const averageRef = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const locationValue = locationRef.current.value;
    const minimumValue = minimumRef.current.value;
    const maximumValue = maximumRef.current.value;
    const averageValue = averageRef.current.value;

    if (!locationValue || !minimumValue || !maximumValue || !averageValue) {
      setError("Please fill in all input fields.");
      return;
    }

    const newCookieStand = {
      location: locationValue,
      minimum_customers_per_hour: parseFloat(minimumValue),
      maximum_customers_per_hour: parseFloat(maximumValue),
      average_cookies_per_sale: parseFloat(averageValue),
    };

    try {
      await addCookieStand(newCookieStand); // Call the function from Home to add the new cookie
      setError("");
      // Reset form fields after successful creation
      locationRef.current.value = "";
      minimumRef.current.value = "";
      maximumRef.current.value = "";
      averageRef.current.value = "";
    } catch (error) {
      setError("Failed to create cookie stand.");
    }
  };

  return (
    <form className="bg-green-300 p-6 rounded-lg shadow-md max-w-2xl w-full mx-auto" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="location" className="block text-gray-700 font-semibold">
          Location
        </label>
        <input
          ref={locationRef}
          name="location"
          id="location"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
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
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto bg-green-500 text-black font-bold px-4 py-2 rounded-md hover:bg-green-600 transition-all"
      >
        Create Cookie
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}
    </form>
  );
}
