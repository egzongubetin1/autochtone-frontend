import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({ ...props }) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };

  return (
    <div className="relative">
      <Input {...props} type={isHidden ? "password" : "text"} />

      <span
        className="absolute top-3 right-3 cursor-pointer"
        onClick={toggleVisibility}
      >
        {isHidden ? (
          <Eye size={18} color="#9A9A9A" />
        ) : (
          <EyeOff size={18} color="#9A9A9A" />
        )}
      </span>
    </div>
  );
}
