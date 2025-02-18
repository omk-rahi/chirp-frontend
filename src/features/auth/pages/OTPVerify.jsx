import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import Button from "../../../components/Button";
import HyperLink from "../../../components/HyperLink";
import { formatTime } from "../../../utils/utils";
import toast from "react-hot-toast";
import { useVerifyOTP } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const OTPVerify = () => {
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [seconds, setSeconds] = useState(300);

  const queryClient = useQueryClient();

  const handleOnChange = (index, event) => {
    const value = event.target.value;

    if (!isNaN(+value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < 5 && value != "") {
        inputRefs.current[index + 1].focus();
      }

      if (index == 5 && value != "") {
        inputRefs.current[index].blur();
      }
    }
  };

  const { verify, isLoading } = useVerifyOTP();

  useEffect(() => {
    if (seconds === 0) return;

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedOTP = otp.join("");
    if (parsedOTP.length !== 6) return toast.error("Please enter a valid OTP");
    const user = queryClient.getQueryData(["register_user"]);
    verify({ email: user.email, otp: parsedOTP });
  };

  return (
    <div className="flex min-h-screen">
      <div className="bg-brand-500 flex-1 min-h-screen hidden lg:flex items-center justify-center">
        <div className="hidden lg:flex justify-center items-center flex-col">
          <img
            src="images/logo-white.svg"
            alt="Brand Logo"
            className="w-24 h-24"
          />
          <p className="text-white font-medium text-lg mt-2">
            Secure Your Access!
          </p>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="max-w-md w-full px-8 lg:mx-auto space-y-6">
          <div className="lg:hidden flex justify-center">
            <img src="images/logo.svg" alt="Brand Logo" className="w-16 h-16" />
          </div>
          <div className="hidden md:flex justify-center">
            <div className="w-12 h-12 border border-gray-200 flex  justify-center items-center rounded-full">
              <Mail fill="#20c997" stroke="#fff" size={28} />
            </div>
          </div>
          <div>
            <h3 className="text-xl font-medium">Verification required</h3>
            <p className="text-gray-600 text-sm mt-1">
              We&apos;ve sent a code to your email
            </p>
          </div>
          <form className="space-y-6 mt-6" onSubmit={handleSubmit}>
            <div className="flex gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="border border-gray-300 w-12 h-12 focus:outline-0 focus:ring-2 focus:ring-brand-500 text-center"
                  maxLength={1}
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleOnChange(index, e)}
                />
              ))}
            </div>

            <Button disbaled={isLoading}>Verify</Button>

            {seconds === 0 ? (
              <p className="text-gray-600 text-sm">
                Didn&apos;t receive code?&nbsp;<HyperLink>Resend</HyperLink>
              </p>
            ) : (
              <p className="text-gray-600 text-sm">
                Time remaining:&nbsp;
                <span className="font-medium">{formatTime(seconds)}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
