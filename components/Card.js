import { numberWithCommas } from "../support/formatNumber";
import { Context } from "../support/globalState";
import { useContext } from "react";
import { displayDate } from "../support/parseDate";

const Card = (props) => {
  const ctx = useContext(Context);
  const {
    profile: { currency },
  } = ctx;

  const { item } = props;
  const date = new Date(item.date);

  const displayValue = () => {
    return `${item?.method == 0 ? "-" : ""} ${
      currency ? currency : "$"
    }${numberWithCommas(item?.value)}`;
  };

  return (
    <div
      className="fade-in cursor-pointer rounded-lg bg-white px-2 py-1 shadow-sm md:px-4 md:py-2 dark:bg-slate-800"
      key={item?.id}
    >
      <div className="flex items-center justify-between border-b border-gray-100 pb-1 text-xs font-thin text-gray-400 md:text-sm md:font-light dark:border-slate-700">
        <span>{displayDate(date)}</span>
        <span>{item?.method == 0 ? "Expenses" : "Income"}</span>
      </div>
      <div
        className="flex items-center justify-between py-1 pb-1 text-sm font-medium md:py-2 md:text-2xl"
        title={`${displayValue()} | ${item?.note}`}
      >
        <span className="flex items-center space-x-1 md:space-x-3">
          <span className="material-icons-round text-sm md:text-2xl">
            {item?.category?.icon}
          </span>
          <div>{item?.note}</div>
        </span>
        <div>{displayValue()}</div>
      </div>
    </div>
  );
};

export default Card;
