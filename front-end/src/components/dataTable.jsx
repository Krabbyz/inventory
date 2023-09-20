import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./dataTable.css";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Button,
  Modal,
} from "antd";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex === "imageUrl" ? false : true, // Not required for imageUrl
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const DataTable = ({
  data,
  onDataUpdate,
  onUpdateRow,
  onAddNewRow,
  onDeleteRow,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newRowForm] = Form.useForm();
  const [editingAnyRow, setEditingAnyRow] = useState(false);
  const [filteredData, setFilteredData] = useState(data);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    setEditingAnyRow(true);
    form.setFieldsValue({
      name: "",
      amountPerBox: "",
      amount: "",
      sku: "",
      imageUrl: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingAnyRow(false);
    setEditingKey("");
  };

  // saves row after editing
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      // Set the default imageUrl if it's not provided
      if (!row.imageUrl) {
        row.imageUrl = "https://i.imgur.com/cT7B2nD.png";
      }

      // row is found
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        onDataUpdate(newData);
        onUpdateRow(key, row);
        setEditingKey("");
        console.log("yeppers");
      } else {
        // if row is for some reason not found -> make new row
        newData.push(row);
        onDataUpdate(newData);
        onAddNewRow(row);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed: ", errInfo);
    }
    setEditingAnyRow(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  // creating new row
  const handleOk = async () => {
    try {
      const newRow = await newRowForm.validateFields();

      // makes sure amount and amountPerBox are ints
      if (newRow.amount) {
        newRow.amount = Number(newRow.amount);
      }
      if (newRow.amountPerBox) {
        newRow.amountPerBox = Number(newRow.amountPerBox);
      }

      // If imageUrl is not provided, set it to the default value
      if (!newRow.imageUrl) {
        newRow.imageUrl = "https://i.imgur.com/cT7B2nD.png";
      }

      const newId = await onAddNewRow(newRow);
      if (newId != null) {
        newRow.key = newId.toString();
      } else {
        // test
        newRow.key = 9999 - data.length;
      }

      onDataUpdate([...data, newRow]);

      setIsModalVisible(false);
      newRowForm.resetFields();
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error here, e.g., by showing a message to the user
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    newRowForm.resetFields();
  };

  // Used for searching names
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  // Adds one box to the amount of an item
  const addBox = (key) => {
    const newData = [...data];
    const index = newData.findIndex((item) => key === item.key);

    if (index > -1) {
      const item = newData[index];
      const updatedItem = {
        ...item,
        amount: item.amount + item.amountPerBox, // Update the 'amount' property
      };
      newData.splice(index, 1, updatedItem);

      onDataUpdate(newData);
      onUpdateRow(key, updatedItem);
    }
  };

  // Deletes Row
  const deleteRow = (key) => {
    const newData = data.filter((item) => item.key !== key);
    onDataUpdate(newData);
    onDeleteRow(key);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "0",
      width: "25%",
      editable: true,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: editingAnyRow ? "Amount per box" : "Boxes",
      dataIndex: "amountPerBox",
      key: "1",
      width: "25%",
      editable: true,
      sorter: (a, b) => {
        const boxesA = Math.floor(a.amount / a.amountPerBox);
        const boxesB = Math.floor(b.amount / b.amountPerBox);
        return boxesA - boxesB;
      },
      render: (text, record) => {
        const editable = isEditing(record);
        if (editable) {
          return text; // Show the regular amountPerBox when editing.
        } else {
          // Show boxes and "Add Box" button when not editing.
          return (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{Math.floor(record.amount / record.amountPerBox)}</div>
              <div>
                <Button size="small" onClick={() => addBox(record.key)}>
                  Add Box
                </Button>
              </div>
            </div>
          );
        }
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "2",
      width: "25%",
      editable: true,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "3",
      width: "10%",
      editable: true,
    },
    {
      title: "ImageUrl",
      dataIndex: "imageUrl",
      key: "4",
      width: "5%",
      editable: true,
      render: (text, record) => {
        const editable = isEditing(record);
        if (editable) {
          return text; // Display the URL text when editing
        } else {
          // Display the image when not editing
          return <img src={text} alt="product" width="50" />;
        }
      },
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Button
              type="link"
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Typography.Link>Cancel</Typography.Link>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Button
              type="link"
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this row?"
              onConfirm={() => deleteRow(record.key)}
            >
              <Button type="link" danger>
                Delete
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === "amountPerBox" || col.dataIndex === "amount"
            ? "number"
            : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const addNewRowModal = (
    <Modal
      title="Add New Row"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={newRowForm}>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="amountPerBox"
          rules={[
            { required: true, message: "Please input the amount per box!" },
          ]}
        >
          <Input placeholder="Amount per box" />
        </Form.Item>
        <Form.Item
          name="amount"
          rules={[{ required: true, message: "Please input the amount!" }]}
        >
          <Input placeholder="Amount" />
        </Form.Item>
        <Form.Item
          name="sku"
          rules={[{ required: true, message: "Please input the SKU!" }]}
        >
          <Input placeholder="SKU" />
        </Form.Item>
        <Form.Item name="imageUrl">
          <Input placeholder="Image URL (optional)" />
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <>
      <div className="pad">
        <Input
          className="searchBar-large margin-bot"
          placeholder="Search by name"
          style={{ marginBottom: "20px" }}
          onChange={handleSearch}
        />
        <Button type="primary" onClick={showModal} className="margin-bot">
          Add New Row
        </Button>
        {addNewRowModal}
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={filteredData}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
          />
        </Form>
        <div className="margin-top">
          <Link to="/user">
            <Button>User Page</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DataTable;
