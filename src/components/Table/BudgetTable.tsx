import React from "react";
import { Table } from "antd";

interface BudgetTableProps {
  dataSource: any[];
}

const BudgetTable: React.FC<BudgetTableProps> = ({ dataSource }) => {
    const columns = [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          render: (date: Date) => new Date(date).toLocaleDateString(),
          sorter: (a: any, b: any) =>
            new Date(a.date).getTime() - new Date(b.date).getTime(),
        },
        {
          title: "Budget",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Total Income",
          dataIndex: "income",
          key: "income",
        },
        {
          title: "Total Expense",
          dataIndex: "expense",
          key: "expense",
        },
        {
          title: "Total Savings",
          dataIndex: "savings",
          key: "savings",
        },
      ];

  return <Table columns={columns} dataSource={dataSource} />;
};

export default BudgetTable;
