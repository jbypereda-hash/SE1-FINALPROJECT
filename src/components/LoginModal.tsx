import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToSignup: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSwitchToSignup,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    firebase?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🆕 added closing animation state
  const [isClosing, setIsClosing] = useState(false);

  // when modal closes, reset form data
  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setErrors({});
      setLoading(false);
      setSuccess(false);
    }
  }, [isOpen]);

  // 🆕 handle closing animation before unmount
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // must match transition duration
  };

  // don’t render unless open or closing (so animation can play)
  if (!isOpen && !isClosing) return null;

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email required";

    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 1500);
    } catch (error: any) {
      console.error("Login error:", error);
      setErrors({
        firebase:
          error.code === "auth/invalid-credential"
            ? "Invalid email or password"
            : error.code === "auth/user-not-found"
            ? "No account found with this email"
            : error.code === "auth/wrong-password"
            ? "Incorrect password"
            : "Login failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-300 ${
        isClosing ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-20 py-5 rounded-2xl w-[550px] text-center text-white relative transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          isClosing
            ? "opacity-0 scale-90 translate-y-6"
            : "opacity-100 scale-100 translate-y-0"
        }`}
      >
        {/* Back Button */}
        <Button
          onClick={handleClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-12 h-12" />
        </Button>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-shrek text-6xl font-bold">CORE LAB</h2>
        <p className="mb-10 text-xl">Log in to continue your fitness journey!</p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="text-left">
          <div>
            <p>Email:</p>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
            />
            {errors.email && (
              <p className="text-red-400 text-xs ml-3">{errors.email}</p>
            )}
          </div>

          <div>
            <p>Password:</p>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-donkey-30 hover:text-shrek duration-300"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs ml-3">{errors.password}</p>
            )}
          </div>

          {errors.firebase && (
            <p className="text-red-400 text-sm text-center mt-2">
              {errors.firebase}
            </p>
          )}

          <div className="flex justify-center">
            <Button className="shrek-btn font-bold py-1 border-3 hover:border-3 mt-15 w-60">
              LOGIN
            </Button>
          </div>
        </form>

        {success && (
          <p className="text-green-400 text-sm mt-3">Login successful!</p>
        )}

        <p className="text-sm text-gray-300 mt-2">
          Don’t have an account?{" "}
          <Button
            onClick={() => {
              handleClose();
              setTimeout(onSwitchToSignup, 300); // wait for fade out
            }}
            className="underline hover:text-shrek transition-colors duration-300"
          >
            Register
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
