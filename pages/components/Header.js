// pages/components/Header.js
import React from "react";

export default function Header({ logoutButton }) {
  return (
    <header className="flex items-center justify-between bg-green-500 py-4 px-8 text-white">
      <h1 className="text-2xl font-bold">Cookie Stand Admin</h1>
      <div>{logoutButton}</div>
    </header>
  );
}
