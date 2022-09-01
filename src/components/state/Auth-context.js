import React ,{useState,useEffect}from "react";

const AuthContext=React.createContext(
{  
    isLoggedin:false,
    onLogin:(email,password)=>{

    },
    onLogout:()=>{

    }
}
);

export const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onLogin= (email, password) => {
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
    console.log('logged in');
  };
  useEffect(() => {
    const isLoggedInInfo=localStorage.getItem('isLoggedIn');
if(isLoggedInInfo==='1'){
  setIsLoggedIn(true);
}
  }, [])
  

  const onLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };
return <AuthContext.Provider
value={{
    isLoggedIn:isLoggedIn,
    onLogin:onLogin,
    onLogout:onLogout
}}>
{props.children}
</AuthContext.Provider>
}
export default AuthContext;