import { useContext, useMemo } from "react";
import { months } from "../support/months";
import { Context } from "../support/globalState";
import SelectWrapper from "./SelectWrapper";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateSelector = () => {
  const { activeMonth, set } = useContext(Context);

  // 1. Convert "MM_YYYY" string back to a JS Date object
  const [m, y] = activeMonth.split("_");
  const selectedDate = new Date(Number(y), Number(m) - 1);

  // 2. Handle change and convert back to "MM_YYYY"
  const handleDateChange = (date) => {
    const newM = ("0" + (date.getMonth() + 1)).slice(-2);
    const newY = date.getFullYear();
    set("activeMonth", `${newM}_${newY}`);
  };

  return (
    <SelectWrapper>
      <DatePicker
        selected={selectedDate} // The JS Date object
        onChange={handleDateChange} // Updates Global State
        dateFormat="MMMM, yyyy"
        showMonthYearPicker // Hides days
        showFullMonthYearPicker // Shows "January" instead of "Jan"
        className="hover:bg-opacity-80 w-48 cursor-pointer appearance-none rounded-lg border-2 border-gray-200 bg-gray-50 px-5 py-2 pr-9 font-sans text-sm text-gray-900 focus:outline-gray-400 md:text-base dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
      />
    </SelectWrapper>
  );
};

export default DateSelector;
