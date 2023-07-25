import React from "react";

export default function Footer() {
    return (
        <footer className="bg-green-500 p-4 text-white text-center mt-8 flex">
            <p className="pr-4">&copy; {new Date().getFullYear()} Cookie Stand Inc.</p>
            <a href="https://github.com/AmerAomar" className="font-semibold">
                Amer Al-Omari
            </a>
        </footer>
    );
}
