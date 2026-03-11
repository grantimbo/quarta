import { useContext, useState, useEffect, useMemo } from "react";
import { Context } from "../../support/globalState";
import DashLayout from "../../components/DashLayout";
import BackHomeLink from "../../components/BackHomeLink";
import PageTitle from "../../components/PageTitle";
import List from "../../components/List";
import Title from "../../components/Title";
import BarChart from "../../components/Overview/BarChart";

export default function Income() {
  const ctx = useContext(Context);
  const [filterWord, setFilterWord] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);

  const incomeList = useMemo(() => {
    if (!ctx?.data) return [];
    return ctx.data.filter((item) => item.method === 1);
  }, [ctx?.data]);

  const chartData = useMemo(() => {
    const data = [];

    incomeList.forEach((item) => {
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
  }, [incomeList]);

  useEffect(() => {
    if (!filterWord) {
      setFilteredItems(incomeList);
      return;
    }

    const lower = filterWord.toLowerCase();

    const filtered = incomeList.filter((item) =>
      item.category.name.toLowerCase().includes(lower)
    );

    setFilteredItems(filtered);
  }, [filterWord, incomeList]);

  return (
    <>
      <Title title="Income" />
      <DashLayout>
        <BackHomeLink />
        <PageTitle title={`Income Overview`} />
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
