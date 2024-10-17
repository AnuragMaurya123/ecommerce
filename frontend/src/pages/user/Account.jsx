import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../context/ShopContext'
import { toast } from 'react-toastify'

const Account = () => {
const {token,BACKEND_URL}=useContext(ShopContext)
const [user, setUser] = useState([])
useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get(
                `${BACKEND_URL}/api/user/profile`, 
                {
                    headers: { 
                        Authorization: `Bearer ${token}` // Make sure to format the token correctly
                    }
                }
            );
            console.log(response);

            if (response.data.success) {
                setUser(response.data.data);
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };
    fetchUserProfile();
}, [token]);

    
  return (
    <div>
      
    </div>
  )
}

export default Account
