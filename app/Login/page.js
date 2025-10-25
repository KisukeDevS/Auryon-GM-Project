"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const toastLogin = {
    success: true , 
    title : "You are Logged In Successfully",
    description : "Now SetUp the dashboard"
    }
    const alreadyLogin = {
      success : false , 
      title : "You are already Logged In",
      descriptionn  : "SetUp the dashboard"
    }
  useEffect(()=> { 
     const toastData = sessionStorage.getItem("toast");
    if (toastData) {
      const { type, title, description } = JSON.parse(toastData);

      // show toast according to type
      if(!session){
      toast.error( "Login Failed try again or try manual")}else {
        toast.success(title , {description : description})
      }

      // clear it after showing
      sessionStorage.removeItem("toast");
    }
  }, []);

  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleOneClick = async (e) => {
    const event = e.currentTarget.name
      
sessionStorage.setItem("toast", JSON.stringify(toastLogin));
    await signIn(event, {
      callbackUrl: window.location.origin + "/Dashboard",
    })
};

  const [eye, setEye] = useState(false);
  const HandlePassEye = () => {
    setEye(eye ? false : true);
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  
  useEffect(() => {
      if (session) {
        toast.success("Already Logged IN", {
            description: "Set up your Dash board👋",
          });
          sessionStorage.setItem("toast",JSON.stringify(alreadyLogin))
        setTimeout(()=> { 
          router.replace("/Dashboard");
        },1400)
      }
    }, []);

  const handleInputSubmit = async (event) => {
    setIsSubmitting(true);
    event.preventDefault();
    const data = form;
    if (
      form.email.endsWith("@gmail.com") &&
      form.password.length > 7 &&
      form.password.length < 13
    ) {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.res) {
         sessionStorage.setItem("toast" , JSON.stringify(toastLogin))
          router.replace("/Dashboard");
          setForm({
            email: "",
            password: "",
          });
         
                 
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else if (result.error) {
          toast.error(result.error);
        }
        console.log({ "Server Response": result });
      } catch (err) {
        console.log(err, "Fetch error from Login.js");
      }
    }
      setIsSubmitting(false);}
  

  return (
       <>
       {
        isSubmitting?<div className="flex justify-center items-center w-screen h-[90vh] overflow-hidden bg-black/30">
          <div className="w-[250px] h-[250px] rounded-full border-8 border-t-transparent border-blue-500 animate-spin"></div>
        </div>:<div className="min-h-[82vh] sm:min-h-[84vh] bg-gradient-to-br from-[#0d022d] via-[#1a063d] to-[#080d24] transition-all duration-200 ease-in-out flex justify-center items-center w-screen overflow-x-hidden overflow-y-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="Login-container bg-gradient-to-br from-blue-400 via-pink-500 to-purple-500 rounded-xl w-[85%] sm:w-[50%] lg:w-[60%] xl:w-[30%] h-[81vh] p-[1.5px] drop-shadow-[0px_0px_10px_rgba(0,123,255,0.2)] hover:drop-shadow-[0px_0px_14px_rgba(0,123,255,0.4)] flex justify-center items-center"
      >
        <div className="bg-gradient-to-br from-[#0d022d] via-[#1a063d] to-[#080d24] w-full h-[80vh] rounded-xl flex flex-col justify-center items-center gap-3">
          <motion.form
            onSubmit={handleInputSubmit}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
            className="backdrop-blur-2xl bg-white/10 w-full h-[80vh] rounded-xl flex flex-col justify-center items-center gap-2"
          >
            <span className="font-bold text-md">Continue With ⬇</span>
            <button
              onClick={handleOneClick}
              name="facebook"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 8 19"
              >
                <path
                  fillRule="evenodd"
                  d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Facebook
            </button>
            <button
              onClick={handleOneClick}
              name="twitter"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#1da1f2] hover:bg-[#1da1f2]/80 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 17"
              >
                <path
                  fillRule="evenodd"
                  d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Twitter
            </button>
            <button
              onClick={handleOneClick}
              name="github"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Github
            </button>

            <button
              onClick={handleOneClick}
              name="google"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#4285F4] hover:bg-[#4285F4]/70 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
            >
              <svg
                className="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fillRule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clipRule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
            <button
              onClick={handleOneClick}
              name="apple"
              type="button"
              className="text-white hover:scale-[1.02] w-[80%] pl-5 bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
            >
              <svg
                className="w-5 h-5 me-2 -ms-1"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
              Sign in with Apple
            </button>
            <div className="flex items-center w-[80%] gap-2 ">
              <hr className="flex-1 border-white/20" />
              <span className="text-white/70 font-semibold text-sm">OR</span>
              <hr className="flex-1 border-white/20" />
            </div>

            <div className="w-[90%] h-[7vh] flex justify-center items-center">
              <input
                onChange={handleInputChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm bg-white/10 pl-5 hover:scale-[1.02] cursor-pointer focus:border-0 focus:outline-0"
                type="text"
                name="email"
                placeholder=" "
                value={form.email.toLowerCase()}
              />
              <label className="absolute left-10 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-60%] peer-focus:text-[12px] font-bold peer-placeholder-shown:left-16 peer-focus:left-10 peer-focus:text-purple-400 peer-placeholder-shown:text-white text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02]">
                Enter Email
              </label>
            </div>

            <div className="w-[90%] h-[7vh] flex justify-center items-center bg-white/10 rounded-md ">
              <input
                onChange={handleInputChange}
                className="text-sm p-2 pt-5 peer block w-full h-[90%] rounded-sm  hover:scale-[1.02] pl-5 cursor-pointer overflow-xhidden overflow-ellipsis focus:outline-0 "
                type={eye ? "text" : "password"}
                placeholder=" "
                name="password"
                value={form.password}
              />
              <label className="absolute left-10 placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm translate-y-[-80%] peer-placeholder-shown:translate-y-0 text-[12px] peer-focus:translate-y-[-60%] peer-focus:text-[12px] font-bold peer-placeholder-shown:left-16 peer-focus:left-10 peer-focus:text-purple-400 peer-placeholder-shown:text-white text-purple-400 pointer-events-none peer-hover:scale-[1.02] hover:scale-[1.02]">
                Enter Password
              </label>
              <img
                onClick={HandlePassEye}
                className="cursor-pointer"
                width={25}
                src={eye ? "/assets/eyeCut.svg" : "/assets/eye.svg"}
                alt=""
              />
            </div>

            <div className="forgotPassword font-bold underline hover:text-purple-400 duration-50 transition-all ease-in-out hover:scale-[1.05] cursor-pointer  text-sm lg:text-md">
              <Link href="/forgot">Forgot Password</Link>
            </div>
            <button
              disabled={isSubmitting ? true : false}
              type="submit"
              className={`rounded-md w-[20%] h-[7%]  font-bold font-mono text-md sm:text-lg text-purple-950 hover:bg-purple-400 hover:scale-[1.05] cursor-pointer animate-pulse ${
                isSubmitting ? "bg-white/10 hover:bg-white/10" : "bg-white"
              }`}
            >
              Login
            </button>
            <Link
              href="/SignUP"
              className="font-bold text=md underline cursor-pointer hover:text-indigo-500 text-sm lg:text-md"
            >
              Wanna create Account
            </Link>
          </motion.form>
        </div>
      </motion.div>
    </div>
       }
    
 </>);
}

export default Page;
