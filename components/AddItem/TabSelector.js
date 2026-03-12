const TabSelector = ({ method, setMethod }) => {
  return (
    <div className="flex space-x-1 border-b-2 border-emerald-400 dark:border-emerald-500">
      <div
        onClick={() => setMethod(0)}
        className={`${
          method === 0
            ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
            : "border-2 border-emerald-400 bg-emerald-100 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-white"
        } cursor-pointer rounded-t-md border-b-0 px-4 py-1 text-xs md:rounded-t-xl md:text-lg`}
      >
        Expense
      </div>
      <div
        onClick={() => setMethod(1)}
        className={`${
          method === 1
            ? "bg-emerald-500 text-white dark:bg-emerald-500 dark:text-white"
            : "border-2 border-emerald-400 bg-emerald-100 text-emerald-500 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-white"
        } cursor-pointer rounded-t-md border-b-0 px-4 py-1 text-xs md:rounded-t-xl md:text-lg`}
      >
        Income
      </div>
    </div>
  );
};

export default TabSelector;
