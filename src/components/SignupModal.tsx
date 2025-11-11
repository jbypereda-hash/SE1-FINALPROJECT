import React, { useEffect, useState } from "react";
import Button from "./Button";
import BackButton from "../assets/icons/arrow-left.svg?react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
    confirmPassword: "",
    role: "member",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Control animation and modal presence
  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true); // modal exists in DOM
      // small timeout ensures transition triggers
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  // Remove modal from DOM after fade-out
  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => setRenderModal(false), 400); // match CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        confirmPassword: "",
        role: "member",
      });
      setErrors({});
      setShowPassword(false);
      setShowConfirmPassword(false);
      setSuccess(false);
      setAuthError(null);
      setLoading(false);
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setAuthError(null);
  };

  // Input Validation
  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Valid email required";

    const normalizedPhone = formData.phoneNumber.replace(/[\s\-\.]/g, "");
    if (!normalizedPhone.match(/^(09\d{9}|\+639\d{9})$/)) {
      newErrors.phoneNumber =
        "Phone number must start with 09 or +63 and be 11 digits long";
    }

    if (!formData.gender) newErrors.gender = "Select a gender";

    if (
      !formData.password.match(
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]).{6,}$/
      )
    ) {
      newErrors.password =
        "Password must be at least 6 characters, include one capital letter, one number, and one symbol";
    }

    if (
      formData.password !== formData.confirmPassword ||
      formData.confirmPassword == ""
    )
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      // 2. Save profile in Firestore WITHOUT the password
      await addDoc(collection(db, "user"), {
        uid: user.uid, // Firebase UID
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        gender: formData.gender,
        role: formData.role,
        createdAt: serverTimestamp(),
      });

      setSuccess(true);

      // reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        confirmPassword: "",
        role: "member",
      });

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    } catch (error: any) {
      console.error("Error creating user:", error);

      setLoading(false);

      if (error.code === "auth/email-already-in-use") {
        setAuthError("This email is already in use.");
      } else if (error.code === "auth/invalid-email") {
        setAuthError("Invalid email address.");
      } else if (error.code === "auth/weak-password") {
        setAuthError("Password is too weak.");
      } else {
        setAuthError("Error creating user. Please try again.");
      }

      return;
    }

    setLoading(false);
  };

  if (!renderModal) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-600${
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
        <Button
          onClick={onClose}
          className="absolute top-5 left-5 hover:scale-110 transition-all duration-200"
        >
          <BackButton className="w-12 h-12"></BackButton>
        </Button>

        {loading && (
          <div className="absolute top-5 right-5 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        )}

        <h2 className="text-shrek text-6xl font-bold">CORE LAB</h2>
        <p className="mb-6 text-2xl">Join our fitness community today!</p>

        {/* form fields */}
        <form onSubmit={handleSubmit} className=" text-left">
          <div className="flex gap-3">
            <div>
              <p>First Name:</p>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className="flex-1 w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
              />
              {errors.firstName && (
                <p className="text-red-400 text-xs ml-3 italic">
                  {errors.firstName}
                </p>
              )}
            </div>
            <div>
              <p>Last Name:</p>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className="flex-1 w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
              />
              {errors.lastName && (
                <p className="text-red-400 text-xs ml-3 italic">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>

          <div>
            <p>Email Address:</p>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
            />
            {errors.email && (
              <p className="text-red-400 text-xs ml-3 italic">{errors.email}</p>
            )}
          </div>

          <div>
            <p>Phone Number:</p>
            <input
              name="phoneNumber"
              type="tel"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
            />
            {errors.phoneNumber && (
              <p className="text-red-400 text-xs ml-3 italic">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <p>Gender</p>
            <div className="relative w-full">
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35 appearance-none"
                defaultValue=""
              >
                <option value="" disabled hidden></option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black-34">
                ▼
              </div>
            </div>

            {errors.gender && (
              <p className="text-red-400 text-xs ml-3 italic">
                {errors.gender}
              </p>
            )}
          </div>

          <div>
            <p>Password:</p>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
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
          </div>

          <div>
            <p>Confirm Password:</p>
            <div className="relative">
              <input
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 focus:outline-black-35"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-donkey-30 hover:text-shrek duration-300"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs ml-3 italic">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div className="flex">
            <Button className="shrek-btn font-bold py-1 border-3 hover:border-3 mt-6 w-60">
              REGISTER
            </Button>
          </div>
        </form>

        {success && (
          <p className="text-green-400 text-sm mt-3">
            Registration successful!
          </p>
        )}

        {authError && (
          <p className="text-red-400 text-xs ml-3 italic">{authError}</p>
        )}

        <p className="text-sm text-gray-300 mt-2">
          Already have an account?{" "}
          <Button
            onClick={() => {
              onClose(); // close signup modal
              onSwitchToLogin(); // open login modal
            }}
            className="underline hover:text-shrek transition-colors duration-300"
          >
            Log in
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
