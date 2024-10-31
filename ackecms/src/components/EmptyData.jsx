import React from "react";
import EmptyIcon from "../icons/empty";

export default function EmptyData() {
  return (
    <div className="relative h-1/2">
      <p className="text-center text-gray-500 items-center">No Data Found</p>
      <EmptyIcon
        color="#1C274C"
        className="w-1/3 h-1/3 opacity-5 absolute top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}
