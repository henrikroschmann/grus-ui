import React from "react";
import { Table } from "antd";
import { faker } from '@faker-js/faker';

interface ITableItem {
  key: number
  id: number
  name: string
  description: string
  price: number
}


const generateDataSource = (): ITableItem[] => {
  const dataSource = [];

  for (let i = 1; i <= 100; i++) {
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const price = parseFloat(faker.commerce.price());

    dataSource.push({ key: i, id: i, name: name, description: description, price: price });
  }

  return dataSource;
};

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (price: number) => `$${price.toFixed(2)}`,
  },
];


const TableDataComponent: React.FC = () => {
  return (
    <Table
      dataSource={generateDataSource()}
      columns={columns}
      pagination={false}
      rowClassName={(record, index) =>
        index % 2 === 1 ? "table-row-striped" : ""
      }
      onRow={(record, rowIndex) => {
        return {
          onMouseEnter: () => {
            if (rowIndex ?? 0 % 2 === 1) {
              // highlight striped rows on hover
              const row = document.querySelector(
                `.ant-table-tbody tr:nth-child(${rowIndex ?? 0 + 1})`
              );
              if (row) {
                row.classList.add("table-row-hover");
              }
            }
          },
          onMouseLeave: () => {
            if (rowIndex ?? 0 % 2 === 1) {
              // remove hover highlight from striped rows
              const row = document.querySelector(
                `.ant-table-tbody tr:nth-child(${rowIndex ?? 0 + 1})`
              );
              if (row) {
                row.classList.remove("table-row-hover");
              }
            }
          },
        };
      }}
      className="table-component"
    />
  );
};

export default TableDataComponent;
