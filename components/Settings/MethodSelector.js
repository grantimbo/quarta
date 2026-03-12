const MethodSelector = ({ method, setMethod }) => {
  return (
    <div className="mb-4 flex space-x-2">
      <div
        onClick={() => setMethod(0)}
        className={`${
          method === 0
            ? "bg-emerald-500 text-white"
            : "border-2 border-emerald-400 bg-emerald-100 text-emerald-500"
        } cursor-pointer rounded-full px-4 py-1`}
      >
        Expense
      </div>
      <div
        onClick={() => setMethod(1)}
        className={`${
          method === 1
            ? "bg-emerald-500 text-white"
            : "border-2 border-emerald-400 bg-emerald-100 text-emerald-500"
        } cursor-pointer rounded-full px-4 py-1`}
      >
        Income
      </div>
    </div>
  );
};

export default MethodSelector;
