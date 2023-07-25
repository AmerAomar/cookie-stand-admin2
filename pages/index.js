// pages/index.js (or any appropriate file location)
import React, { useState } from "react";
import Head from "next/head";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CreateForm from "./components/CreateForm";
import ReportTable from "./components/ReportTable";

export default function Home() {
  const [cookieStands, setCookieStands] = useState([]);

  const addCookieStand = (stand) => {
    setCookieStands([...cookieStands, stand]);
  };

  return (
    <>
      <Head>
        <title>Cookie Stand Admin</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center mt-8 bg-slate-200">
        <CreateForm addCookieStand={addCookieStand} />
        {cookieStands.length > 0 ? (
          <ReportTable cookieStands={cookieStands} />
        ) : (
          <h2 className="text-2xl font-bold mt-8">No Cookie Stands Available</h2>
        )}
      </main>

      <Footer />
    </>
  );
}
