import { useState } from "react";

const useToggleContainer = () => {
  const [isActive, setIsActive] = useState(false);

  const handleRegisterClick = () => {
    setIsActive(true); // Thêm class active
  };

  const handleLoginClick = () => {
    setIsActive(false); // Xóa class active
  };

  return {
    isActive,
    handleRegisterClick,
    handleLoginClick
  };
};

export default useToggleContainer;
