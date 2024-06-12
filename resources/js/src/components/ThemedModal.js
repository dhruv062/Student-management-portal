import React from "react";
import { Modal } from "flowbite-react";
import { ThemeContext } from "../contexts/ThemeContext";
const ThemedModal = ({ children, ...props }) => {
  const { selectedTheme } = React.useContext(ThemeContext);
  return (
    <Modal {...props}>
      <div data-theme={selectedTheme} className="overflow-scroll">
        {children}
      </div>
    </Modal>
  );
};

export default ThemedModal;
