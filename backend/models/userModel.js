import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },  // Corrected 'require' to 'required'
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: { type: Object, default: {} },  // Ensure cartData is always initialized
  },
  { minimize: false }  // Prevents Mongoose from removing empty objects
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
