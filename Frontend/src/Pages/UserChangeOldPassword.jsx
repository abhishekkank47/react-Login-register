import React, { useState } from "react";
import { motion } from "framer-motion";

const UserChangeOldPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword, error, isLoading, message] = []; // Replace this with `useAuthStore()` hook if available

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Old Password:", oldPassword);
    console.log("New Password:", password);
    console.log("Confirm New Password:", confirmPassword);

    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      alert("Passwords do not match");
      return;
    }

    try {
      console.log("Attempting to reset password...");

      setTimeout(() => {
        console.log("Password reset successfully");
        alert("Password reset successfully");

        setTimeout(() => {
          console.log("Redirecting to login...");
        }, 2000);
      }, 1000);
    } catch (error) {
      console.error("Error resetting password:", error);
      alert(error.message || "Failed to reset password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-white bg-gradient-to-r ">
            Change Password
          </h2>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="oldPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Old Password
              </label>
              <input
                id="oldPassword"
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm New Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm text-gray-900 bg-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                required
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Resetting..." : "Set New Password"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default UserChangeOldPassword;
