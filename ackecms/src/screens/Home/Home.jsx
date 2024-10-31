
import React from "react";
import Cards from "./partials/Cards";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center bg-slate-50">
      <h1 className="text-3xl font-bold my-4">My Cards</h1>
      <Cards />
    </div>
  );
}
