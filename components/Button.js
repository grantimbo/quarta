export const colors = {
  green:
    "bg-emerald-400 hover:bg-emerald-300 dark:bg-emerald-500 dark:hover:bg-emerald-400 text-white dark:text-slate-50 focus:outline-emerald-700 ",
  gray: "text-slate-500 dark:text-slate-400 bg-slate-300 hover:bg-slate-200 focus:outline-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:outline-slate-700",
  red: "text-white dark:text-slate-50 bg-red-500 hover:bg-red-400 focus:outline-red-700 dark:bg-red-500 dark:hover:bg-red-400 dark:focus:outline-red-700",
};

export const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-5 py-2 text-lg",
  lg: "px-10 py-3 text-xl",
  xl: "px-10 py-3 text-2xl",
};

export const style = `space-x-2 cursor-pointer shadow-md rounded-md text-center justify-center inline-flex items-center`;

const Button = (props) => {
  const { onClick, text, icon, additionalClasses, color, size, loading } =
    props;
  return (
    <button
      onClick={() => !loading && onClick()}
      className={`${style} ${colors[color] || colors.green} ${
        sizes[size] || sizes.md
      } ${additionalClasses}`}
    >
      {loading ? (
        <>
          <span className="material-icons-round origin-center animate-spin">
            rotate_right
          </span>
        </>
      ) : (
        <>{icon && <span className="material-icons-round">{icon}</span>}</>
      )}

      <span className="truncate">{loading ? loading : text}</span>
    </button>
  );
};

export default Button;
