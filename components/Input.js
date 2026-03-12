const Input = (props) => {
  const { type, placeholder, value, setValue, additionalClasses, color } =
    props;

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e?.target?.value)}
      className={`${
        color == "gray"
          ? "border-gray-200 bg-gray-50 text-gray-900 focus:outline-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
          : "border-lime-500 bg-lime-100 text-teal-900 focus:outline-lime-400 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-500"
      } hover:bg-opacity-80 rounded-lg border-2 px-6 py-2 text-sm md:text-lg ${additionalClasses}`}
      placeholder={placeholder}
    ></input>
  );
};

export default Input;
