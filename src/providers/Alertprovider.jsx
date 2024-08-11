import {useState , createContext} from "react"

export const alertContext = createContext();
function Alertprovider({children}){
    const [alert , setAlert]= useState();
    const removeAlert = ()=>{
      console.log("removealert is running");
      setAlert(undefined)
  }
  return (<alertContext.Provider value={{ alert, setAlert,removeAlert }}>
  {children}
  </alertContext.Provider>);
}
export default  Alertprovider