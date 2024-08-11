import {useState, useEffect, createContext} from "react"
import Loading from "./loading"
import axios from "axios";
export const userContext = createContext();
function UserProvider({children}){
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          axios.get("https://myeasykart.codeyogi.io/me", {
            headers: {
              Authorization: token,
            }
          }).then((response) => {
            setUser(response.data);
            setLoading(false);
          }).catch(() => {
            localStorage.removeItem("token");
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      }, []);
      if (loading) {
        return <Loading/>;
      }
    return  <userContext.Provider value={ {user, setUser} }>
        {children}
    </userContext.Provider>
}
export default  UserProvider