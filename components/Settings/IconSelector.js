import { categoryIcons } from "../../support/categoryIcons";

const IconSelector = ({ icon, setIcon }) => {
  return (
    <div className="mb-6 max-h-72 overflow-y-auto">
      <div className="grid grid-cols-6 gap-1">
        {categoryIcons?.map((e) => (
          <div
            key={e}
            onClick={(e) => setIcon(e?.target?.dataset?.value)}
            data-value={e}
            className={`${
              icon == e
                ? "border-emerald-400 bg-emerald-500 text-emerald-100 dark:border-emerald-400 dark:bg-emerald-500 dark:text-emerald-100"
                : "bg-gray-100 text-gray-400 dark:bg-slate-600/20 dark:text-slate-400"
            } flex cursor-pointer items-center justify-center rounded-md border px-4 py-2`}
          >
            <span className="material-icons-round" data-value={e}>
              {e}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconSelector;
