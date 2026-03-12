import { Context } from "../../support/globalState";
import { useContext, useEffect } from "react";

const CategorySelector = ({ method, category, setCategory }) => {
  const ctx = useContext(Context);

  useEffect(() => {
    setCategory(null);
  }, [method]);

  const expense = ctx?.profile?.categories?.filter((e) => e.method == 0);
  const income = ctx?.profile?.categories?.filter((e) => e.method == 1);

  return (
    <div className="mb-6 grid grid-cols-2 gap-1 md:grid-cols-3 md:gap-2">
      {method === 0
        ? expense?.map((cat) => {
            return (
              <div
                onClick={() => {
                  setCategory({
                    name: cat?.name,
                    icon: cat?.icon,
                  });
                }}
                key={cat?.name}
                className={`${
                  cat?.name == category?.name
                    ? "border-lime-500 bg-lime-200 text-lime-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-500"
                    : "border-2 border-gray-200 bg-gray-50 text-gray-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
                } justify-left flex cursor-pointer items-center space-x-2 rounded-full border-2 px-4 py-2 text-xs md:text-base`}
              >
                {cat?.icon && (
                  <span className="material-icons-round text-sm md:text-xl">
                    {cat?.icon}
                  </span>
                )}
                <span>{cat?.name}</span>
              </div>
            );
          })
        : income?.map((cat) => {
            return (
              <div
                onClick={() => {
                  setCategory({
                    name: cat?.name,
                    icon: cat?.icon,
                  });
                }}
                key={cat?.name}
                className={`${
                  cat?.name == category?.name
                    ? "border-lime-500 bg-lime-200 text-lime-600"
                    : "bg-gray-50 text-gray-500"
                } flex cursor-pointer items-center justify-center space-x-2 rounded-full border-2 px-4 py-2 text-sm`}
              >
                {cat?.icon && (
                  <span className="material-icons-round">{cat?.icon}</span>
                )}
                <span>{cat?.name}</span>
              </div>
            );
          })}
    </div>
  );
};

export default CategorySelector;
