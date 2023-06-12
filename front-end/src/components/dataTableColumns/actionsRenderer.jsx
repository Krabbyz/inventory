import React from "react";
import { Button, Popconfirm } from "antd";

const ActionsRenderer = ({
  form,
  editingRow,
  record,
  setEditingRow,
  deleteRow,
}) => {
  if (editingRow === record.key) {
    return (
      <>
        <Button type="link" onClick={() => form.submit()}>
          Save
        </Button>
        <Button type="link" onClick={() => setEditingRow(null)}>
          Cancel
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button
          type="link"
          onClick={() => {
            setEditingRow(record.key);
            form.setFieldsValue({
              name: record.name,
              amountPerBox: record.amountPerBox,
              amount: record.amount,
              sku: record.sku,
              imageUrl: record.imageUrl,
            });
          }}
        >
          Edit
        </Button>
        <Popconfirm
          title={<span>Are you sure you want to delete this row?</span>}
          onConfirm={() => deleteRow(record.key)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ size: "large" }}
          cancelButtonProps={{ size: "large" }}
          placement="topRight"
        >
          <Button type="link" danger>
            Delete
          </Button>
        </Popconfirm>
      </>
    );
  }
};

export default ActionsRenderer;
