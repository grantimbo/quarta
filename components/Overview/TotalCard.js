import Router from "next/router";
import { numberWithCommas } from "../../support/formatNumber";

const OverviewCard = ({ currency, link, data, name }) => {
  const value = () => {
    return `${currency ? currency : "$"}${numberWithCommas(data || 0)}`;
  };

  const displayValue = () => {
    if (name == "Balance") {
      if (data < 0) {
        const d = numberWithCommas(data || 0);
        return `-${currency ? currency : "$"}${d.slice(1)}`;
      } else {
        return value();
      }
    } else {
      return value();
    }
  };

  return (
    <div
      onClick={() => Router.push(link)}
      className="flex cursor-pointer items-center rounded-lg bg-white p-2 shadow-sm md:p-6 dark:bg-slate-800"
      title={`${name}: ${displayValue()}`}
    >
      <div className="w-full">
        <div className="truncate text-xl font-medium md:text-4xl">
          {displayValue()}
        </div>
        <div className="text-xs font-thin md:text-base md:font-light">
          {name}
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
