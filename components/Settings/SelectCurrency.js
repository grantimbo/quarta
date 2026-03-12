import { currencies } from "../../support/currencies";
import { useEffect, useState } from "react";
import SelectWrapper from "../SelectWrapper";

const SelectCurrency = (props) => {
  const { color, currency, setCurrency, additionalClasses } = props;

  const [selectedCode, setSelectedCode] = useState("USD");

  const assignCurrency = (cc) => {
    const tmpCur = currencies.find((c) => c.cc === cc);

    if (!tmpCur) return;

    setCurrency(tmpCur.symbol);
    setSelectedCode(tmpCur.cc);
  };

  useEffect(() => {
    const tmpCur = currencies.find((c) => c.symbol === currency);

    if (tmpCur) {
      setSelectedCode(tmpCur.cc);
    }
  }, [currency]);

  return (
    <SelectWrapper additionalClasses={`mb-4`}>
      <select
        onChange={(e) => assignCurrency(e?.target?.value)}
        required
        value={selectedCode}
        className={`${
          color === "gray"
            ? "border-2 border-gray-200 bg-gray-50 text-gray-900 focus:outline-gray-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
            : "border-2 border-emerald-500 bg-emerald-100 text-teal-900 focus:outline-emerald-400 dark:border-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-500"
        } w-full appearance-none rounded-full px-5 py-2 text-sm md:text-base ${additionalClasses}`}
      >
        {currencies?.map((cur) => {
          return (
            <option key={cur?.cc} value={cur?.cc}>
              {cur?.name} ({cur?.symbol})
            </option>
          );
        })}
      </select>
    </SelectWrapper>
  );
};

export default SelectCurrency;
