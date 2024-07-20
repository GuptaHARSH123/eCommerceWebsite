import React from 'react';
import { IoIosArrowRoundForward } from "react-icons/io";

function Box() {
  return (
    <div className="flex gap-2 py-10  ml-10">
      <div className="border border-primary-dark bg-primary-default text-white px-3 py-1">1</div>
      <div className="border border-orange-500 px-3 py-1 text-orange-500 hover:bg-primary-default hover:text-white ">2</div>
      <div className="border border-orange-500 px-2 text-orange-500 hover:bg-primary-default hover:text-white"><IoIosArrowRoundForward /></div>
    </div>
  );
}

export default Box;
