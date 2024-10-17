import userModel from "../models/userModel.js";

// Function to add an item to the cart
const addToCart = async (req, res) => {
    try {
        const { userId, itemId, sizes } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize if undefined

        // Check if the item exists in the cart
        if (cartData[itemId]) {
            // Check if the size exists, then increment the quantity
            if (cartData[itemId][sizes]) {
                cartData[itemId][sizes] += 1;
            } else {
                cartData[itemId][sizes] = 1;
            }
        } else {
            // Add new item with size and set initial quantity
            cartData[itemId] = {};
            cartData[itemId][sizes] = 1;
        }

        // Update user's cart in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        // Send successful response
        res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to update an item in the cart
const updateToCart = async (req, res) => {
    try {
        const { userId, itemId, sizes, quantity } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Check if the item and size exist in the cart
        if (cartData[itemId] && cartData[itemId][sizes]) {
            cartData[itemId][sizes] = quantity;

            // Update cart in the database
            await userModel.findByIdAndUpdate(userId, { cartData });
            //remove product from card


            // Send successful response
            res.json({ success: true, message: "Cart updated successfully" });
        } else {
            // If item or size doesn't exist
            res.json({ success: false, message: "Item or size not found in the cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// Function to update an item in the cart
const deleteToCart = async (req, res) => {
    try {
        const { userId, itemId, sizes } = req.body;
   
        // Fetch user data
        const userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Check if the item and size exist in the cart
        if (cartData[itemId] && cartData[itemId][sizes]) {
    
           // Remove the item size from the cart
           delete cartData[itemId][sizes];

           // If no sizes are left for the item, remove the item entirely
           if (Object.keys(cartData[itemId]).length === 0) {
               delete cartData[itemId];
           }
          //remove product from card
          await userModel.findByIdAndUpdate(userId, { cartData });

            // Send successful response
            res.json({ success: true, message: "Cart Remove successfully" });
        } else {
            // If item or size doesn't exist
            res.json({ success: false, message: "Item or size not found in the cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Function to get the user's cart
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body;

        // Fetch user data
        const userData = await userModel.findById(userId);

        // Return cart data
        if (userData && userData.cartData) {
            res.json({ success: true, cartData: userData.cartData });
        } else {
            res.json({ success: false, message: "No cart data found" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export { addToCart, getUserCart, updateToCart,deleteToCart };
