// pages/Home.js
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateForm from "./components/CreateForm";
import ReportTable from "./components/ReportTable";
import { useAuth } from "../contexts/auth";

export default function Home() {
  const auth = useAuth(); // Access the authentication state
  const [cookieStands, setCookieStands] = useState([]);

  const fetchCookieStands = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/cookie/", {
        headers: {
          Authorization: `Bearer ${auth.tokens.access}`, // Include the access token in the headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cookie stands.");
      }

      const data = await response.json();
      setCookieStands(data);
    } catch (error) {
      console.error("Error fetching cookie stands:", error);
    }
  };

  useEffect(() => {
    fetchCookieStands();
  }, []);

  const addCookieStand = async (newCookieStand) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/cookie/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.tokens.access}`, // Include the access token in the headers
        },
        body: JSON.stringify(newCookieStand),
      });

      if (!response.ok) {
        throw new Error("Failed to create cookie stand.");
      }

      const data = await response.json();
      setCookieStands([...cookieStands, data]);
      console.log("New Cookie Stand:", data);
    } catch (error) {
      console.error("Failed to create cookie stand:", error);
    }
  };

  const handleDeleteCookieStand = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/cookie/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.tokens.access}`, // Include the access token in the headers
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete cookie stand.");
      }

      setCookieStands(cookieStands.filter((stand) => stand.id !== id));
    } catch (error) {
      console.error("Failed to delete cookie stand:", error);
    }
  };

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>
      <div className="flex flex-col min-h-screen bg-slate-100 w-auto">
        <Header logoutButton={auth.user && <button onClick={auth.logout} className="ml-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600">Logout</button>} />
        <main className="flex-grow w-full mx-auto p-8">
          <CreateForm addCookieStand={addCookieStand} />
          <div className="bg-white rounded-lg mt-4 p-4">
            {cookieStands.length > 0 ? (
              <>
                <p className="text-xl font-semibold mb-4">Total Cookie Stands: {cookieStands.length}</p>
                <ReportTable cookieStands={cookieStands} onDeleteCookieStand={handleDeleteCookieStand} />
              </>
            ) : (
              <h2 className="text-2xl font-bold mt-8">No Cookie Stands Available</h2>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
