import { Context } from "../../support/globalState";
import { useContext } from "react";

const BarChart = ({ data, filterWord, setFilterWord }) => {
  const ctx = useContext(Context);

  const total = data.reduce((a, b) => {
    return a + b.value;
  }, 0);

  return (
    <div className="mb-6 grid gap-3 rounded-md bg-white p-2 pb-3 shadow-sm md:mb-10 md:gap-10 md:p-6 md:pb-10 dark:bg-slate-800">
      {data?.map((e) => {
        return (
          <div key={e.category}>
            <div className="mb-1 flex justify-between text-sm font-medium md:text-xl">
              <div>
                {e?.category} - {parseInt((e?.value / total) * 100)}%
              </div>
              <div>{ctx?.profile?.currency + e?.value}</div>
            </div>

            <div
              className="relative h-2 w-full cursor-pointer overflow-hidden rounded-full bg-emerald-100 hover:opacity-80 md:h-4"
              onClick={() => {
                filterWord === e.category
                  ? setFilterWord(null)
                  : setFilterWord(e?.category);
              }}
            >
              <span
                className="absolute top-0 bottom-0 left-0 bg-emerald-400 dark:bg-emerald-400"
                style={{ width: `${parseInt((e?.value / total) * 100)}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
