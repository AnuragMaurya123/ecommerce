import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("");
  const {
    navigate,
    getCardAmount,
    setCartItem,
    products,
    cartItem,
    delivery_fee,
    token,
    BACKEND_URL,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // Use public key here
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            BACKEND_URL + "/api/order/verifyrazorpay",
            {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            },
            {
              headers: { 
                  Authorization: `Bearer ${token}` // Make sure to format the token correctly
              }
          }
          );
          if (data.success) {
            navigate("/orders");
            setCartItem({});
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
    };
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItem = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItem.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        amount: getCardAmount() + delivery_fee,
        items: orderItem,
      };

      switch (method) {
        //api call for cod
        case "cod":
          try {
            const response = await axios.post(
              BACKEND_URL + "/api/order/place",
              orderData,
              {
                headers: { 
                    Authorization: `Bearer ${token}` // Make sure to format the token correctly
                }
            }
            );

            if (response.data.success) {
              setCartItem({});
              navigate("/orders");
            } else {
              toast.error(response.data.msg);
            }
          } catch (error) {
            console.log(error);
            toast.error(error.message);
          }

          break;
        
          case "stripe":
           
              const response = await axios.post(
                BACKEND_URL + "/api/order/stripe",
                orderData,
                {
                  headers: { 
                      Authorization: `Bearer ${token}` // Make sure to format the token correctly
                  }
              }
              );
              
              
              if (response.data.success) {
                 const {session_url}=response.data
                 window.location.replace(session_url)
              } else {
                toast.error(response.data.msg);
              }
           
  
            break;



            case "razorpay":
           
            const responseRazorpay = await axios.post(
              BACKEND_URL + "/api/order/razor",
              orderData,
              {
                headers: { 
                    Authorization: `Bearer ${token}` // Make sure to format the token correctly
                }
            }
            );
            
            
             if (responseRazorpay.data.success) {
                initPay(responseRazorpay.data.order)
             } else {
              toast.error(responseRazorpay.data.msg);
            }
         

          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  border-t"
    >
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title title={"DELIVERY"} title2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            name="firstname"
            value={formData.firstname}
            onChange={onChangeHandler}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Enter your First Name"
            required
          />
          <input
            name="lastname"
            value={formData.lastname}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter your Last Name"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="email"
            value={formData.email}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Email Address"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="street"
            value={formData.street}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Street"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="city"
            value={formData.city}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter City"
            required
          />
          <input
            name="state"
            value={formData.state}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter State"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="zipcode"
            value={formData.zipcode}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Zipcode"
            required
          />
          <input
            name="country"
            value={formData.country}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Country"
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            name="phone"
            value={formData.phone}
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            type="text"
            placeholder="Enter Phone Number"
            required
          />
        </div>
      </div>

      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title title={"PAYMENT"} title2={"METHOD"} />
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-green-400" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt=""></img>
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                } `}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt=""></img>
            </div>
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              ></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              type="submit"
              className="bg-[#e3642a] text-white px-16 py-3 text-sm"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
