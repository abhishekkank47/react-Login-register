import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'


const ProtectedRoutes = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(()=>{
        const checkAuth = async()=>{
            try {
                const {data} = await axios.get("http://localhost:8000/api/v1/auth/check-auth", { withCredentials: true})

                setIsAuthenticated(data.success)
            } catch (error) {
                setIsAuthenticated(false)
            }
        }

        checkAuth();
    },[])

    if (isAuthenticated === null) {
        return <div>Loading...</div>; // Show a loader while checking auth
      }
      
      return isAuthenticated ? children : <Navigate to="/login" replace />;
  
}

export default ProtectedRoutes