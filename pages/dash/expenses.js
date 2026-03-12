import { useContext, useState, useEffect, useMemo } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";
import BarChart from "../../components/Overview/BarChart";

export default function Expenses() {
  const ctx = useContext(Context);
  const [filterWord, setFilterWord] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const expenseList = useMemo(() => {
    if (!ctx?.data) return [];
    return ctx.data.filter((item) => item.method === 0);
  }, [ctx?.data]);

  const chartData = useMemo(() => {
    const data = [];

    expenseList.forEach((item) => {
      const existingIndex = data.findIndex(
        (x) => x.category === item.category.name
      );

      const value = parseFloat(item.value) || 0;

      if (existingIndex === -1) {
        data.push({
          category: item.category.name,
          value,
        });
      } else {
        data[existingIndex].value += value;
      }
    });

    return data;
  }, [expenseList]);

  useEffect(() => {
    if (!filterWord) {
      setFilteredItems(expenseList);
      return;
    }

    const lower = filterWord.toLowerCase();

    const filtered = expenseList.filter((item) =>
      item.category.name.toLowerCase().includes(lower)
    );

    setFilteredItems(filtered);
  }, [filterWord, expenseList]);

  return (
    <>
      <Title title="Expenses" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Expenses Overview`} />
        <BarChart
          data={chartData}
          filterWord={filterWord}
          setFilterWord={setFilterWord}
        />
        <List data={filteredItems} />
      </DashLayout>
    </>
  );
}
