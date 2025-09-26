'use client'

import { useEffect, useState } from 'react';
import { HiOutlineMail } from "react-icons/hi";
import { GoUnverified } from "react-icons/go";
import { TbLockPassword } from "react-icons/tb";
import Cookies from 'js-cookie';
const ForgetPassword = () => {

    const [step ,setStep] = useState(1);// start step 1
    const [email, setEmail] = useState('');// useState for email 
    const [verificationCode, setVerificationCode] = useState('');//verificayion email
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error , setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
useEffect(()=>{
   const token = Cookies.get("tokenlogin");
   setIsLoggedIn(!!token);
},[])
    const pageTitle = isLoggedIn ? "تغییر  " : "بازیابی ";
      const handleSendCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!email) {
            setError('لطفا ایمیل را وارد کنید');
            return;
        }
        const emailRegex = /^[^@ ]+@[^@ ]+\.[^@ ]+$/;
        if (!emailRegex.test(email)) {
            setError('لطفا یک آدرس ایمیل معتبر وارد کنید');
            return;
        }
        
        // request to server
        setError('');
        setStep(2); // step to 2
      };

      const handleVerifyCode = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // accept or reject  verification code
        if(!verificationCode){
          setError('لطفا کد تایید وارد کنید')
          
        }else{
          setError('');
          setStep(3); // step to 3
        }
      };


      const handleResetPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // send new Password to server
        if (!newPassword) {
          setError('پسوردی وارد نکردید');
          return;
        }
        if (newPassword.length < 8) {
          setError('رمز عبور باید حداقل 8 کاراکتر باشد');
          return;
        }
        if (newPassword !== confirmPassword) {
          setError('رمز عبور و تکرار آن مطابقت ندارند');
          return;
        }

        setError('');
        // After successful validation, send new Password to server
      };


      // if (response.ok) {
      //   setSuccess('رمز عبور با موفقیت تغییر کرد');
      //   setTimeout(() => {
      //     router.push('/login');
      //   }, 3000);
      // } else {
      //   setError(data.message || 'خطا در تغییر رمز عبور');
      // }


  return (
   
   <div className="bg-[#B2685A] min-h-screen flex items-center justify-center p-4">
    <div className="bg-[#F7F5E9] rounded-2xl shadow-xl p-6 w-full max-w-md">
       <div className="text-center mb-8">
        <p className="text-gray-600 mt-2">مراحل {pageTitle} <span 
        className='text-black text-lg'>رمز عبور</span> را دنبال کنید</p>
       </div>
        <div className="flex justify-between mb-8 relative">
          <div className='absolute top-1/2 right-0 left-0 h-0.5
           bg-gray-300 transform -translate-y-1/2 -z-20'>
        </div>
                {/* show steps */}


             
               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ?
                 'bg-[#B2685A] text-white' : 'bg-gray-300 text-gray-600'}`}>1</div>
               <div className={` absolute top-4 right-8 w-38 h-0.5 z-0 
                 ${step >= 2 ? 'bg-[#B2685A]' : 'bg-gray-300'}`}></div>
            
    
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 
            'bg-[#B2685A] text-white' : 'bg-gray-300 text-gray-600'}`}>2</div>
            <div className={` absolute top-4 left-8 w-38 h-0.5 z-0 
                 ${step >= 3 ? 'bg-[#B2685A]' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 
            'bg-[#B2685A] text-white' : 'bg-gray-300 text-gray-600'}`}>3</div>
          </div>
        <form className="space-y-6">
             {error && ( 
               <div className='bg-red-100 border border-red-400
                text-red-700 px-4 py-3 rounded relative'>
                  {error}
               </div>
              )}
             {/* {success && (
             <div className="bg-green-100 border border-green-400 
             text-green-700 px-4 py-3 rounded relative">
              {success}
             </div>
             )} */}
            {/* step1:Enter email */}
           {step === 1 && (
             <div className="space-y-4">
              <p className="text-gray-700 text-right">
                لطفا آدرس ایمیل خود را وارد کنید.
              </p>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium 
                text-gray-700 mb-1 text-right">
                  آدرس ایمیل
                </label>
                <div className="relative">
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pr-3 pl-10 py-3 border outline-none border-gray-300  
                    rounded-lg focus:ring-2 focus:ring-[#B2685A] focus:border-transparent" 
                    placeholder="example@example.com" 
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                   <HiOutlineMail size={20} />
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleSendCode}
                className="w-full bg-[#B2685A] hover:bg-[#9c5a4d] text-white py-3 px-4 
                rounded-lg font-medium transition-colors"
              >
                ارسال کد تایید
              </button>
            </div>
          )}

           {/* step2:Enter code verfication */}
          {step === 2 && (
            <div className="space-y-4">
              <p className="text-gray-700 text-right">
              کد ارسالی <span className="font-semibold">{email}</span>   
                     را در کادر زیر وارد کنید.
              </p>
              
              <div>
                <label htmlFor="verificationCode" className="block text-sm font-medium 
                text-gray-700 mb-1 text-right">
                  کد تایید
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    id="verificationCode"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="w-full pr-3 pl-10 py-3 border outline-none border-gray-300 
                    rounded-lg focus:ring-2 focus:ring-[#B2685A] focus:border-transparent" 
                    placeholder="XXXX" 
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                   <GoUnverified size={20} />
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">

                <button 
                  onClick={handleVerifyCode}
                  className="w-full bg-[#B2685A] hover:bg-[#9c5a4d] text-white 
                  py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  تایید کد
                </button>
              </div>
            </div>
          )}

          {/*step3: enter new code */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-gray-700 text-right">
                رمز عبور جدید خود را وارد کنید.
              </p>
              <div>
                <label htmlFor="newPassword" 
                className="block text-sm font-medium text-gray-700 mb-1 text-right">
                  رمز عبور جدید
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    id="newPassword"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pr-3 pl-10 py-3 border outline-none border-gray-300 
                    rounded-lg focus:ring-2 focus:ring-[#B2685A] focus:border-transparent" 
                    placeholder="رمز عبور جدید" 
                    required
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 
                  text-gray-400">
                    <TbLockPassword  size={20}/>
                  </span>
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium 
                text-gray-700 mb-1 text-right">
                  تکرار رمز عبور جدید
                </label>
                <div className="relative">
                  <input 
                    type="password" 
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pr-3 pl-10 py-3 border outline-none
                    border-gray-300 rounded-lg focus:ring-2 
                    focus:ring-[#B2685A] focus:border-transparent" 
                    placeholder="تکرار رمز عبور جدید" 
                    required
                  />

                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                   <TbLockPassword  size={20}/>
                  </span>
                </div>
              </div>
              
              <div className="flex space-x-4">

                <button 
                  onClick={handleResetPassword}
                  className="w-full bg-[#B2685A] hover:bg-[#9c5a4d] text-white 
                  py-3 px-4 rounded-lg font-medium transition-colors"
                >
                  تغییر رمز عبور
                </button>
              </div>
            </div>
          )}

        </form>
   </div>
  </div>


)};

export default ForgetPassword;
