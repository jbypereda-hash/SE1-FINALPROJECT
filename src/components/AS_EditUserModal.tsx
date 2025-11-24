import React, { useEffect, useState } from "react";
import Button from "./Button";

interface User {
  uid: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  role: "member" | "admin" | "coach";
  email?: string;
  createdAt?: any;
  lastSignInTime?: string;
}

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (updatedUser: Partial<User> & { uid: string }) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onClose,
  user,
  onSave,
}) => {
  const [formData, setFormData] = useState<User | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({});
  const [showContent, setShowContent] = useState(false);
  const [renderModal, setRenderModal] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderModal(true);
      const timer = setTimeout(() => setShowContent(true), 10);
      return () => clearTimeout(timer);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!showContent && !isOpen) {
      const timer = setTimeout(() => setRenderModal(false), 400);
      return () => clearTimeout(timer);
    }
  }, [showContent, isOpen]);

  useEffect(() => {
    if (user) {
      setFormData(user);
      setErrors({});
    }
  }, [user]);

  if (!renderModal || !formData) return null;

  const handleChange = (field: keyof User, value: string) => {
    if (field === "firstName" || field === "lastName") {
      value = value.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }
    if (field === "phoneNumber") {
      value = value.replace(/[\s\-\.]/g, "");
    }
    setFormData({ ...formData, [field]: value });
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof User, string>> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    const normalizedPhone = formData.phoneNumber.replace(/[\s\-\.]/g, "");
    if (!normalizedPhone.match(/^(09\d{9}|\+639\d{9})$/)) {
      newErrors.phoneNumber =
        "Phone number must start with 09 or +63 and be 11 digits long";
    }

    if (!formData.gender) newErrors.gender = "Select a gender";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveClick = () => {
    if (!validate()) return;

    onSave({
      uid: formData.uid,
      firstName: formData.firstName,
      lastName: formData.lastName,
      gender: formData.gender,
      phoneNumber: formData.phoneNumber,
      role: formData.role,
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/70 flex justify-center items-center z-50 transition-opacity duration-600 ${
        showContent ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
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
          className="absolute top-5 left-5 hover:scale-110"
        >
          ←
        </Button>

        <h2 className="text-shrek text-6xl font-bold">Edit User</h2>
        <p className="mb-6 text-2xl">Update user information below</p>

        <form className="text-left space-y-4">
          <div className="flex gap-3">
            <div>
              <p>First Name:</p>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                className="flex-1 w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35"
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
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                className="flex-1 w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35"
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
              type="text"
              value={formData.email || ""}
              readOnly
              className="w-full px-3 py-1.5 rounded-4xl bg-gray-100 text-black-35 cursor-not-allowed"
            />
          </div>

          <div>
            <p>Phone Number:</p>
            <input
              type="tel"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35"
            />
            {errors.phoneNumber && (
              <p className="text-red-400 text-xs ml-3 italic">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <p>Gender:</p>
            <select
              value={formData.gender}
              onChange={(e) =>
                handleChange("gender", e.target.value as User["gender"])
              }
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 appearance-none"
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-400 text-xs ml-3 italic">
                {errors.gender}
              </p>
            )}
          </div>

          <div>
            <p>Role:</p>
            <select
              value={formData.role}
              onChange={(e) =>
                handleChange("role", e.target.value as User["role"])
              }
              className="w-full px-3 py-1.5 rounded-4xl bg-donkey-10 text-black-35 appearance-none"
            >
              <option value="member">Member</option>
              <option value="coach">Coach</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleSaveClick}
              className="shrek-btn font-bold py-1 border-3 mt-6 w-60"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
