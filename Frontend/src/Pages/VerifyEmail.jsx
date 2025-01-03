import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null); // Added error state
  const [isLoading, setIsLoading] = useState(false); // Added isLoading state
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    setIsLoading(true); // Start loading state

    try {
      await verifyEmail(verificationCode); // Ensure you have the correct verifyEmail function here
      navigate("/");
      toast.success("Email verified successfully");
    } catch (err) {
      setError("Verification failed. Please try again."); // Set error message
      console.log(err);
    } finally {
      setIsLoading(false); // Stop loading state
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC]">
    <div className="relative bg-gradient-to-r from-[#5D54A4] to-[#7C78B8] w-full max-w-[400px] h-[500px] shadow-[0px_0px_24px_#5C5696] overflow-hidden">
      <div className="z-10 relative h-full px-8">
        <h2 className="pt-[80px] pb-[50px] text-center text-[#30008b] text-2xl font-bold">
          Verify Your Email
        </h2>
        <p className="text-center text-gray-700 mb-6">
          Enter the 6-digit code sent to your email address.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6 w-full text-center">
          <div className="flex justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold bg-[#fff0] text-[#4d4d4d] border-2 border-gray-400 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading || code.some((digit) => !digit)}
           className="mt-[40px] w-fit py-3 px-4 border-2 border-[#d3d3d3] text-[#30008b] border-gradient-to-r from-[#3f00a5] to-[#613787] font-bold rounded-full shadow-lg hover:border-[#5D54A4] hover:bg-[#5D54A4] hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <RotatingLines width="30" height="30" strokeColor="#ffffff" strokeWidth="5" animationDuration="0.75" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </div>

      <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
        <span className="absolute top-[-172px] right-0 w-[220px] h-[220px] bg-[#6C63AC] rounded-[32px] transform rotate-45" />
        <span className="absolute top-[-24px] right-0 w-[190px] h-[540px] bg-gradient-to-l from-[#5D54A4] to-[#6A679E] rounded-[32px] transform rotate-45" />
        <span className="absolute top-[-50px] right-[120px] w-[520px] h-[520px] bg-white rounded-tl-[72px] transform rotate-45 rounded-[32px]" />
        <span className="absolute top-[420px] right-[50px] w-[200px] h-[400px] bg-[#7E7BB9] rounded-[60px] transform rotate-45" />
      </div>
    </div>
  </div>
  );
};

export default VerifyEmail;
