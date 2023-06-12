import React from "react";
import { Form, Input } from "antd";

// Renderer for Name, Amount, Sku, ImageUrl columns in dataTable.jsx

const SimpleColumnRenderer = ({
  form,
  editingRow,
  record,
  colName,
  dataText,
}) => {
  if (editingRow === record.key) {
    return (
      <Form.Item name={colName} rules={[{ required: true }]}>
        <Input
          placeholder={`Enter ${colName}`}
          size="small"
          onPressEnter={() => form.submit()}
        />
      </Form.Item>
    );
  } else {
    return typeof dataText === "string" ? <p>{dataText}</p> : dataText;
  }
};

export default SimpleColumnRenderer;
