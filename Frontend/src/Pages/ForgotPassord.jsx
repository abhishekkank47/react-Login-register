import { useState } from "react";
import { FaEnvelope } from "react-icons/fa"; // For the envelope icon
import { RotatingLines } from "react-loader-spinner"; // Correct import for the loader
import axios from "axios"; // If using axios, or use fetch instead

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true while processing
    setError(null); // Reset any previous error

    try {
      console.log("Submitting email:", email); // Log email being sent

      const response = await axios.post("http://localhost:8000/api/v1/auth/forgot-password", { email });

      if (response.data.success) {
        setIsSubmitted(true);
      } else {
        throw new Error("Failed to submit the request.");
      }
    } catch (error) {
      // Check if the error is a response error from the API
      if (error.response) {
        console.error('Server responded with an error:', error.response.data);
        setError(`Error: ${error.response.data.message || "Something went wrong"}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error('No response received:', error.request);
        setError("No response from the server. Please try again.");
      } else {
        // Something else triggered the error
        console.error('Error setting up the request:', error.message);
        setError("There was an error sending the reset link. Please try again.");
      }
    } finally {
      setIsLoading(false); // Reset loading state after submission
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC]">
      <div className="relative bg-gradient-to-r from-[#5D54A4] to-[#7C78B8] w-full max-w-[400px] h-[500px] shadow-[0px_0px_24px_#5C5696] overflow-hidden">
        <div className="z-10 relative h-full px-8">
          <h2 className="pt-[80px] pb-[50px] text-center text-[#30008b] text-2xl font-bold">
            Forget Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full text-center">
              <div className="relative mb-6">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-10 py-3 bg-transparent border-b-2 border-gray-300 focus:border-purple-500 text-gray-700 font-medium placeholder-gray-400 focus:outline-none"
                />
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                type="submit"
                className="mt-[40px] w-fit py-3 px-4 border-2 text-[#30008b] border-gradient-to-r from-[#3f00a5] to-[#613787] font-bold rounded-full shadow-lg hover:border-[#5D54A4] hover:bg-[#5D54A4] hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
              >
                {isLoading ? (
                  <RotatingLines width="30" height="30" strokeColor="#ffffff" strokeWidth="5" animationDuration="0.75" />
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          ) : (
            <div className="text-center mt-6">
              <p className="text-gray-500">
                A reset link has been sent to your email. Please check your inbox.
              </p>
            </div>
          )}

          <div className="absolute bottom-0 right-0 text-white text-center py-5 w-[160px]">
            <h3>
              <a href="/login" className="text-white hover:underline">Back to login</a>
            </h3>
          </div>
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

export default ForgotPassword;
