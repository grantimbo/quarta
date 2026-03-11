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
            ? "bg-gray-50 border-2 border-gray-200 text-gray-900 focus:outline-gray-400"
            : "bg-lime-100 border-2 border-lime-500 text-teal-900 focus:outline-lime-400"
        } text-sm w-full px-5 py-2 rounded-full appearance-none md:text-base ${additionalClasses}`}
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
