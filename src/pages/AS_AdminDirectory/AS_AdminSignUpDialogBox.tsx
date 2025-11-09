import React, { useState } from "react";
import Button from "../../components/Button";
import DropDownArrow from "../../assets/icons/dropdownarrow.svg?react";

interface AS_AdminSignUpDialogBoxProps {
  onClose?: () => void;
}

const AS_AdminSignUpDialogBox: React.FC<AS_AdminSignUpDialogBoxProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    onClose?.();
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Creating new admin:", formData);
    // TODO: connect to backend API here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Dialog Box */}
      <div className="bg-[#1c1c24] w-[500px] h-[577px] rounded-[24px] shadow-lg flex flex-col items-center p-4.5 relative">
        {/* Header */}
        <header className="flex flex-col items-center justify-center gap-px px-2.5 py-2 relative">
          <h1 className="text-[#d5ff5f] text-[40px] font-bold [font-family:'Inria_Sans-Bold', Helvetica] text-center">
            CORE LAB
          </h1>
          <p className="text-[#e8e8e8] text-2xl [font-family:'Inria_Sans-Regular', Helvetica] text-center">
            Create a new admin account.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleCreateAccount}
          className="flex flex-col items-center mt-1 w-full"
        >
          {/* First and Last Name */}
          <div className="flex items-start justify-center w-full gap-x-3">
            {["firstName", "lastName"].map((name, i) => (
              <div key={i} className="flex flex-col items-start">
                <label
                  htmlFor={name}
                  className="text-[#e8e8e8] text-base [font-family:'Inria_Sans-Regular', Helvetica]"
                >
                  {name === "firstName" ? "First Name:" : "Last Name:"}
                </label>
                <input
                  id={name}
                  type="text"
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-[195px] h-[35px] bg-[#b5b5b5] rounded-[50px] px-4 text-[#333333] outline-none"
                />
              </div>
            ))}
          </div>

          {/* Full-width fields */}
          {[
            { label: "Email Address:", name: "email", type: "email" },
            { label: "Phone Number:", name: "phone", type: "tel" },
            { label: "Gender:", name: "gender", type: "select" },
            { label: "Password:", name: "password", type: "password" },
            { label: "Confirm Password:", name: "confirmPassword", type: "password" },
          ].map((field, i) => (
            <div
              key={i}
              className="flex flex-col items-start px-[31px] py-0.5 w-full"
            >
              <label
                htmlFor={field.name}
                className="text-[#e8e8e8] text-base [font-family:'Inria_Sans-Regular', Helvetica]"
              >
                {field.label}
              </label>

              {field.type === "select" ? (
                <div className="relative w-[400px] h-[35px] bg-[#b5b5b5] rounded-[50px] flex items-center justify-end px-2.5">
                  <select
                    id={field.name}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleInputChange}
                    className="absolute inset-0 w-full h-full px-4 text-[#333333] appearance-none rounded-[50px] outline-none"
                  >
                    <option value=""></option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  <Button
                    type="button"
                    variant="ghost"
                    className="relative z-10 p-0 m-0 rounded-full hover:bg-transparent"
                  >
                    <DropDownArrow className="w-6 h-6 text-[#333333]" />
                  </Button>
                </div>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleInputChange}
                  className="w-[400px] h-[35px] bg-[#b5b5b5] rounded-[50px] px-4 text-[#333333] outline-none"
                />
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex items-center justify-center gap-[15px] mt-5.5 mb-4">
            <Button
              type="button"
              onClick={handleCancel}
              className="w-[89px] h-[35px] border-4 border-[#d5ff5f] rounded-[50px] flex items-center justify-center hover:bg-[#d5ff5f]/10 transition-colors"
            >
              <span className="text-[#d5ff5f] font-bold text-base [font-family:'Inria_Sans-Bold', Helvetica]">
                CANCEL
              </span>
            </Button>

            <Button
              type="submit"
              className="w-[207px] h-[35px] bg-[#d5ff5f] rounded-[50px] flex items-center justify-center hover:bg-[#c4ee4e] transition-colors"
            >
              <span className="text-black font-bold text-base [font-family:'Inria_Sans-Bold', Helvetica]">
                CREATE ADMIN ACCOUNT
              </span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AS_AdminSignUpDialogBox;
