const SelectWrapper = ({ children, additionalClasses }) => {
  return (
    <div className={`relative ${additionalClasses}`}>
      <span className="absolute top-0 right-0 bottom-0 flex w-8 items-center">
        <span className="material-icons-round z-10 text-black dark:text-slate-50">
          keyboard_arrow_down
        </span>
      </span>
      {children}
    </div>
  );
};

export default SelectWrapper;
