import { TiTick } from "react-icons/ti";
import { ImCross } from "react-icons/im";
import React, { useEffect } from "react";
import withAlert from "./withAlert";

function Alert({ alert ,setAlert ,removeAlert }) {
    useEffect(function(){
        if(alert){
            const dismissTimmer = setTimeout(removeAlert , 3*1000);
            return () => clearTimeout(dismissTimmer);
        }

    },[alert])

    if(!alert){
        return <></>;
    }
    const {message ,type}=alert;
    let color;
    let Icon;
    if (type === 'success') {
        color = 'text-green-500';
        Icon = <TiTick size={20}  className="text-green-500" />;
    } else if (type === 'error') {
        color = 'text-red-500';
        Icon = <ImCross size={20} className="text-red-500" />;
    }
    return (
        <div className="w-screen h-20 flex justify-between items-center p-4 border border-gray-500  bg-slate-300">
            <div className="flex gap-5"> 
            {Icon}
            <span className={`ml-2 ${color}`}>{message}</span>
            </div>
            <button  onClick={removeAlert}>
            Dismiss
            </button>
        </div>
    );
}

export default withAlert(Alert);
