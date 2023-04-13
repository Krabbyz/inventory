import { Button, Table, Form, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import "./dataTable.css";

const DataTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const data = [
      {
        key: `0`,
        name: `Black Tea`,
        boxes: `2`,
        amount: `46`,
      },
      {
        key: `1`,
        name: `Green Tea`,
        boxes: `1`,
        amount: `16`,
      },
      {
        key: `2`,
        name: `Earl Grey Tea`,
        boxes: `4`,
        amount: `92`,
      },
      {
        key: `3`,
        name: `Oolong Tea`,
        boxes: `2`,
        amount: `56`,
      },
      {
        key: `4`,
        name: `Strawberry Syrup`,
        boxes: `1`,
        amount: `2`,
      },
      {
        key: `5`,
        name: `Passionfruit Syrup`,
        boxes: `5`,
        amount: `52`,
      },
    ];
    setDataSource(data);
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "30.7%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Enter item name",
                },
              ]}
            >
              <Input onPressEnter={() => form.submit()} />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Boxes",
      dataIndex: "boxes",
      width: "30.7%",
      sorter: (a, b) => {
        if (a.boxes === b.boxes) {
          return a.amount - b.amount;
        } else {
          return a.boxes - b.boxes;
        }
      },
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="boxes">
              <Input onPressEnter={() => form.submit()} />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "30.6%",
      sorter: (a, b) => a.amount - b.amount,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="amount">
              <Input onPressEnter={() => form.submit()} />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Actions",
      width: "8%",
      render: (_, record) => {
        return (
          <>
            {editingRow === record.key ? (
              <>
                <Button
                  type="link"
                  className="largeText"
                  onClick={() => form.submit()}
                >
                  Save
                </Button>
                <Button
                  type="link"
                  className="largeText"
                  onClick={() => setEditingRow(null)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="link"
                  className="largeText"
                  onClick={() => {
                    setEditingRow(record.key);
                    form.setFieldsValue({
                      name: record.name,
                      boxes: record.boxes,
                      amount: record.amount,
                    });
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title={
                    <span style={{ fontSize: "18px" }}>
                      Are you sure you want to delete this row?
                    </span>
                  }
                  onConfirm={() => deleteRow(record.key)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ size: "large" }}
                  cancelButtonProps={{ size: "large" }}
                  placement="topRight"
                >
                  <Button type="link" className="largeText" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </>
            )}
          </>
        );
      },
    },
  ];

  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, { ...values, key: editingRow });
    setDataSource(updatedDataSource);
    setEditingRow(null);
  };

  const addNewRow = () => {
    const newRow = {
      key: dataSource.length,
      name: "enter name",
      boxes: "enter box amount",
      amount: "enter amount",
    };
    setDataSource([...dataSource, newRow]);
  };

  const deleteRow = (key) => {
    const updatedDataSource = dataSource.filter((row) => row.key !== key);
    setDataSource(updatedDataSource);
  };

  const filterData = () => {
    if (searchText.trim() === "") {
      return dataSource;
    }

    return dataSource.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <Form form={form} onFinish={onFinish}>
          <Input.Search
            className="searchBar-large margin"
            placeholder="Search by name"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button onClick={addNewRow} type="primary" className="margin">
            Add new item
          </Button>
          <Table
            columns={columns}
            dataSource={filterData()}
            pagination={false}
            bordered
            size="small"
          ></Table>
        </Form>
      </header>
    </div>
  );
};

export default DataTable;
