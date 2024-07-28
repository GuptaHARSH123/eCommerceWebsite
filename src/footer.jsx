import React from 'react';
function Footer(){
  console.log("footer is running..")
  return(
    <div className="  bg-gray-600 ">
    <div className=" max-w-5xl mx-auto px-9 text-color-white flex justify-between items-center text-white text-sm py-6">
      <p className="">copyright @ 2024 CodeYogi</p>
      <p className="">Powerd by CodeYogi</p>
    </div>
    </div>
  );
}
export default React.memo(Footer)