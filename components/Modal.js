import { useEffect } from "react";

const Modal = ({ children, onClose }) => {
  useEffect(() => {
    document.querySelector("body").setAttribute("style", "overflow:hidden");
    return () => {
      document.querySelector("body").removeAttribute("style");
    };
  }, []);

  return (
    <div className="fade-in fixed -top-2 right-0 bottom-0 left-0 z-50 overflow-x-auto p-4 md:p-10">
      <div className="relative z-10 mx-auto mt-4 w-full max-w-lg rounded-lg bg-gray-50 p-4 shadow-sm md:mt-20 dark:bg-slate-800">
        <div
          onClick={onClose}
          className="absolute top-2 right-3 cursor-pointer text-slate-500 dark:text-slate-400"
        >
          <span className="material-icons-round text-4xl">highlight_off</span>
        </div>

        {children}
      </div>

      <div
        onClick={onClose}
        className="fixed top-0 right-0 bottom-0 left-0 bg-black/80 dark:bg-slate-900/80"
      />
    </div>
  );
};

export default Modal;
