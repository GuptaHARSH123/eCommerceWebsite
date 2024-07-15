import React from 'react';
import { ImSpinner9 } from "react-icons/im";
function Loading(){
  return <div className=" text-3xl p-4 m-2 flex justify-center items-center text-5xl text-primary-default grow " > <ImSpinner9 className="animate-spin" />
 </div>
}
export default Loading;