import React from "react";

// <<<<<<< feature/abhishek
// const Login = () => {
//   return <></>;
// };

// export default Login;
=======
// import './css/login.css'; 
export default function Login() {
  return (
  <>
<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#C7C5F4] to-[#776BCC]">
  <div className="relative bg-gradient-to-r from-[#5D54A4] to-[#7C78B8] w-full max-w-[400px] h-[500px] shadow-[0px_0px_24px_#5C5696] overflow-hidden">
    <div className="z-10 relative h-full px-8 pt-[125px]">
      <form className="w-full">
        <div className="relative py-5">
          <i className="absolute top-8 left-0 text-[#7875B5] fas fa-user" />
          <input type="text" className="w-3/4 py-3 pl-6 border-b-2 border-[#D1D1D4] focus:outline-none focus:border-[#6A679E] font-bold"  placeholder="User name / Email" />
        </div>
        <div className="relative py-5">
          <i className="absolute top-8 left-0 text-[#7875B5] fas fa-lock" />
          <input type="password" className="w-3/4 py-3 pl-6 border-b-2 border-[#D1D1D4] focus:outline-none focus:border-[#6A679E] font-bold" placeholder="Password" />
        </div>
        <button className="w-full mt-8 py-4 px-5 text-[#4C489D] bg-white text-xs font-bold uppercase rounded-2xl border-2 border-[#D4D3E8] shadow-[0px_2px_2px_#5C5696] flex items-center justify-between">
          <span>Log In Now</span>
          <i className="text-[#7875B5] fas fa-chevron-right" />
        </button>
      </form>
      <div className="absolute bottom-0 right-0 text-white text-center py-5 w-[160px]">
        <h3>Log in via</h3>
        <div className="flex justify-center space-x-5">
          <a href="#" className="text-white text-shadow-[0px_0px_8px_#7875B5] p-5 transform hover:scale-150"><i className="fab fa-instagram" /></a>
          <a href="#" className="text-white text-shadow-[0px_0px_8px_#7875B5] p-5 transform hover:scale-150"><i className="fab fa-facebook" /></a>
          <a href="#" className="text-white text-shadow-[0px_0px_8px_#7875B5] p-5 transform hover:scale-150"><i className="fab fa-twitter" /></a>
        </div>
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
</>
  )
}
// >>>>>>> master
