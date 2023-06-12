import React from "react";
import { Form, Input, Button } from "antd";

const AmountPerBoxRenderer = ({
  form,
  editingRow,
  record,
  onDataUpdate,
  data,
}) => {
  if (editingRow === record.key) {
    return (
      <Form.Item name="amountPerBox" rules={[{ required: true }]}>
        <Input
          placeholder="Enter amount per box"
          size="small"
          onPressEnter={() => form.submit()}
        />
      </Form.Item>
    );
  } else {
    const boxes = Math.floor(record.amount / record.amountPerBox);

    const handleAddBox = () => {
      const updatedDataSource = data.map((row) => {
        if (row.key === record.key) {
          return { ...row, amount: row.amount + row.amountPerBox };
        }
        return row;
      });
      onDataUpdate(updatedDataSource);
    };

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>{boxes}</p>
        <Button onClick={handleAddBox} type="default">
          Add Box
        </Button>
      </div>
    );
  }
};

export default AmountPerBoxRenderer;
