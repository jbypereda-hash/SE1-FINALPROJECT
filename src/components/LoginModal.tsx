import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { authTransition } from "../hooks/authTransition";

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
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  // Lock UI when modal opens
  useEffect(() => {
    if (isOpen) authTransition.setLocked(true);
  }, [isOpen]);

  // Unlock UI after modal completely unmounts
  useEffect(() => {
    if (!renderModal && !isOpen) authTransition.setLocked(false);
  }, [renderModal, isOpen]);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Remove from DOM after fade-out
  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => setRenderModal(false), 200);
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

  // Reset form on open
  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setErrors({});
      setResetMessage(null);
      setLoading(false);
      setShowPassword(false);
      setSuccess(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setShowContent(false);
    setTimeout(() => {
      handleClose(); // actually remove modal from AuthModals
    }, 200); // match your fade-out duration
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email required";

    if (!password.trim()) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleForgotPassword = async () => {
    setErrors({});
    setResetMessage(null);
    if (!email.trim()) {
      setErrors({ email: "Enter your email to reset your password" });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("A password reset link has been sent to your email.");
    } catch (error: any) {
      if (error.code === "auth/user-not-found")
        setErrors({ firebase: "No account found with that email." });
      else if (error.code === "auth/invalid-email")
        setErrors({ email: "Invalid email address" });
      else setErrors({ firebase: "Failed to send reset email. Try again." });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      try {
        await updateDoc(doc(db, "user", user.uid), {
          lastSignInTime: user.metadata.lastSignInTime,
        });
      } catch (err) {
        console.error("Failed to update lastSignInTime:", err);
      }

      const userDoc = await getDoc(doc(db, "user", user.uid));
      const role = userDoc.exists() ? userDoc.data().role : "member";

      setSuccess(true);

      // close modal after animation
      setTimeout(() => {
        handleClose();
        authTransition.setLocked(false);

        if (role === "admin") window.location.assign("/AS_AdminDirectory");
        else window.location.assign("/");
      }, 200);
    } catch (error: any) {
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

  if (!renderModal) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-500 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-black-35 px-20 py-5 rounded-2xl w-[550px] text-center text-white relative transform transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
          showContent
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-6"
        }`}
      >
        {/* Back Button */}
        <Button
          onClick={onClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-12 h-12" />
        </Button>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-shrek text-6xl font-bold">CORE LAB</h2>
        <p className="mb-10 text-xl">
          Log in to continue your fitness journey!
        </p>

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
              <p className="text-red-400 text-xs ml-3 italic">{errors.email}</p>
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
              <p className="text-red-400 text-xs ml-3 italic">
                {errors.password}
              </p>
            )}

            <p
              onClick={() => handleForgotPassword()}
              className="text-sm text-right mt-2 mr-2 text-donkey-30 hover:text-shrek cursor-pointer transition-colors"
            >
              Forgot Password?
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="shrek-btn font-bold py-1 border-3 hover:border-3 mt-15 w-60"
            >
              LOGIN
            </Button>
          </div>
        </form>

        {errors.firebase && (
          <p className="text-red-400 text-sm text-center mt-2">
            {errors.firebase}
          </p>
        )}

        {resetMessage && (
          <p className="text-green-400 text-sm text-center mt-2">
            {resetMessage}
          </p>
        )}

        {success && (
          <p className="text-green-400 text-sm text-center mt-2">
            Login successful!
          </p>
        )}

        <p className="text-sm text-gray-300 mt-2">
          Don’t have an account?{" "}
          <Button
            onClick={() => {
              handleClose();
              setTimeout(onSwitchToSignup, 200);
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
