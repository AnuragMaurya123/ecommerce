import axios from 'axios';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const AccountUpdate = ({ setFrom, details }) => {
  const { token, BACKEND_URL,setToken } = useContext(ShopContext);
  const [user, setUser] = useState({ 
    name:details.name || '', 
    email: details.email ||'', 
    password: '', 
    phone:details.phone || '', 
    gender: details.gender ||'' });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Please upload a valid image file (JPG/PNG).');
      setPhoto(null);
      return;
    }
    setPhoto(file);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const inputData = new FormData();
      inputData.append("name", user.name);
      inputData.append("email", user.email);
      inputData.append("phone", user.phone);
      inputData.append("password", user.password);
      inputData.append("gender", user.gender);
      if (photo) {
        inputData.append("photo", photo);
      }
      const response = await axios.post(`${BACKEND_URL}/api/user/update/${details._id}`, inputData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setLoading(false);
  
      if (response.data.success) {
        setToken(response.data.token)  
        localStorage.setItem("token",response.data.token)
        toast.success(response.data.message);
        setFrom(null)
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col items-center w-[90%] sm:max-w-[500px] m-auto mt-14 gap-4 text-gray-800">
        <div className="flex justify-around items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-[#009e3e] text-3xl">Update Information</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
      <p className="">Fill only those input box which you want to update</p>
        <input
          name="name"
          id="username"
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Full Name"
          required
          autoComplete="on"
          value={user.name || ''} // Ensure value is always a string
          onChange={handleInput}
        />

        <div className="w-full flex gap-3">
          <input
            name="phone"
            id="phone"
            type="number"
            className="w-1/2 px-3 py-2 border border-gray-800"
            placeholder="Phone No."
            required
            autoComplete="on"
            value={user.phone || ''} // Ensure value is always a string
            onChange={handleInput}
          />

          <select
            value={user.gender || ''} // Ensure value is always a string
            onChange={handleInput}
            name="gender"
            className="w-1/2 px-3 py-2 border border-gray-800"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <input
          id="email"
          name="email"
          type="email"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Email"
          autoComplete="on"
          value={user.email || ''} // Ensure value is always a string
          onChange={handleInput}
        />

        <input
          id="password"
          name="password"
          type="password"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Password"
          autoComplete="off"
          value={user.password || ''} // Ensure value is always a string
          onChange={handleInput}
        />

        <input
          id="photo"
          name="photo"
          type="file"
          className="border border-gray-800 file-input w-full rounded-none"
          autoComplete="off"
          accept=".jpg, .png"
          onChange={handleFileInput}
        />

        <div className="flex justify-around gap-4">
          <button
            onClick={() => setFrom(false)}
            className="bg-gray-400 text-white hover:text-black hover:bg-slate-300 font-light px-8 py-2 mt-4 transition-all duration-150"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#e3642a] text-white hover:text-black hover:bg-green-400 transition-all duration-150 font-light px-8 py-2 mt-4 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountUpdate;
