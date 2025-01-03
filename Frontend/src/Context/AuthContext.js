// import React, { createContext, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({children}) => {
//   const [token, setToken] = useState(null);

//   //Set token
//   const login = (newToken) => {
//     setToken(newToken);
//     document.cookie = `token=${newToken}; path=/;`; 
//   };

//   //Clear token
//   const logout = () => {
//     setToken(null);
//     document.cookie = `token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`; 
//   };

//   return (
//     <AuthContext.Provider>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => useContext(AuthContext);