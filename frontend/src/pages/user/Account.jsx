import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import { toast } from "react-toastify";
import Title from "../../components/Title";
import AccountUpdate from "../../components/AccountUpdate";

const Account = () => {
  const { token, BACKEND_URL } = useContext(ShopContext);
  const [user, setUser] = useState(null); // Initialize user as null for better clarity

  const [from, setFrom] = useState(false);

 
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/user/profile`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is formatted correctly
        },
      });

     

      if (response.data.success) {
        setUser(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch user profile");
       
      }
    } catch (error) {
      console.error(error); // Log the full error for debugging

      if (error.response) {
        // Server responded with a status other than 2xx
        if (error.response.status === 401) {
          toast.error(error.response.data.message || "Unauthorized access");
        } else {
          toast.error(error.response.data.message || "An error occurred");
        }
      } else {
        // Network or other errors
        toast.error("Network error. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
    }
  }, [token]);

  if (from) {
    return <AccountUpdate setFrom={setFrom} details={user} />;
  } else {
    return (
      <div>
        {user ? (
          <div>
            <div className="flex w-full flex-col gap-4 lg:flex-row ">
              <div className="w-full gap-6 flex md:flex-row flex-col items-center justify-center bg-transparent">
                <div className="lg:w-96">
                  <img src={user.photo} alt="" />
                </div>

                <div className="">
                  <div className=" flex flex-col justify-between items-center  px-7 py-7">
                    <div className="">
                      <div className="title text-[22px] font-semibold">
                        <Title title={"PERSONAL"} title2={"INFORMATION"} />
                      </div>
                      <div>
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <div className="text-gray-500 font-semibold w-[100px]">
                              Name:
                            </div>
                            <div className="text-base text-qblack font-medium">
                              {user.name}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-gray-500 font-semibold w-[100px]">
                              Email:
                            </div>
                            <div className="text-base text-qblack font-medium">
                              {user.email}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-gray-500 font-semibold w-[100px]">
                              Phone:
                            </div>
                            <div className="text-base text-qblack font-medium">
                              {user.phone}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="text-gray-500 font-semibold w-[100px]">
                              Gender:
                            </div>
                            <div className="text-base text-qblack font-medium">
                              {user.gender}
                            </div>
                          </div>
                          <div>
                            <button
                              className="px-5 bg-slate-400 py-2 text-white font-medium w-full"
                              onClick={() => setFrom("account")}
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading user profile...</p>
        )}
      </div>
    );
  }
};

export default Account;
