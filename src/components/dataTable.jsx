import { Button, Table, Form, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./dataTable.css";

const DataTable = ({ data, onDataUpdate }) => {
  const [dataSource, setDataSource] = useState([]);
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setDataSource(data);
  }, [data]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "25%",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="name" rules={[{ required: true }]}>
              <Input
                placeholder="Enter name"
                size="small"
                onPressEnter={() => form.submit()}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: editingRow != null ? "Amount per box" : "Boxes",
      dataIndex: "amountPerBox",
      width: "25%",
      sorter: (a, b) => {
        const boxesA = Math.floor(a.amount / a.amountPerBox);
        const boxesB = Math.floor(b.amount / b.amountPerBox);
        return boxesA - boxesB;
      },
      render: (_, record) => {
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
            const updatedDataSource = dataSource.map((row) => {
              if (row.key === record.key) {
                return { ...row, amount: row.amount + row.amountPerBox };
              }
              return row;
            });
            setDataSource(updatedDataSource);
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
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "25%",
      sorter: (a, b) => a.amount - b.amount,
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="amount" rules={[{ required: true }]}>
              <Input
                placeholder="Enter amount"
                size="small"
                onPressEnter={() => form.submit()}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "SKU",
      dataIndex: "sku",
      width: "10%",
      sorter: (a, b) => a.sku.localeCompare(b.sku),
      render: (text, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="sku" rules={[{ required: true }]}>
              <Input
                placeholder="Enter sku"
                size="small"
                onPressEnter={() => form.submit()}
              />
            </Form.Item>
          );
        } else {
          return <p>{text}</p>;
        }
      },
    },
    {
      title: "Image",
      dataIndex: "imageUrl",
      width: "5%",
      render: (imageUrl, record) => {
        if (editingRow === record.key) {
          return (
            <Form.Item name="imageUrl">
              <Input
                size="small"
                onPressEnter={() => form.submit()}
                placeholder="Image URL"
              />
            </Form.Item>
          );
        } else {
          return (
            <img
              src={imageUrl}
              alt="item"
              style={{ width: "100%", maxWidth: "100px" }}
            />
          );
        }
      },
    },
    {
      title: "Actions",
      width: "10%",
      render: (_, record) => {
        return (
          <>
            {editingRow === record.key ? (
              <>
                <Button type="link" onClick={() => form.submit()}>
                  Save
                </Button>
                <Button type="link" onClick={() => setEditingRow(null)}>
                  Cancel
                </Button>
              </>
            ) : (
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
            )}
          </>
        );
      },
    },
  ];

  const onFinish = (values) => {
    const updatedDataSource = [...dataSource];
    updatedDataSource.splice(editingRow, 1, {
      ...values,
      key: editingRow,
      amountPerBox: parseInt(values.amountPerBox, 10),
      amount: parseInt(values.amount, 10),
      imageUrl: values.imageUrl || "https://i.imgur.com/cT7B2nD.png",
    });

    setDataSource(updatedDataSource);
    onDataUpdate(updatedDataSource);
    setEditingRow(null);
  };

  const getNextAvailableKey = () => {
    let nextKey = 0;
    const isKeyTaken = (key) => {
      return dataSource.some((row) => row.key === String(key));
    };
    while (isKeyTaken(nextKey)) {
      nextKey++;
    }
    return String(nextKey);
  };

  const addNewRow = () => {
    const newRow = {
      key: getNextAvailableKey(),
      name: "enter name",
      amountPerBox: "enter box amount",
      amount: "enter amount",
      imageUrl: "https://i.imgur.com/cT7B2nD.png",
      sku: "enter sku",
    };
    const updatedDataSource = [...dataSource, newRow];
    setDataSource(updatedDataSource);
    onDataUpdate(updatedDataSource);
    setEditingRow(newRow.key);
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
    <div className="pad">
      <Form form={form} onFinish={onFinish} className="margin-bot">
        <Input.Search
          className="searchBar-large margin-bot"
          placeholder="Search by name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button onClick={addNewRow} type="primary" className="margin-bot">
          Add new item
        </Button>
        <Table
          rowClassName="table-row-small"
          columns={columns}
          dataSource={filterData()}
          pagination={false}
          bordered
          size="small"
        ></Table>
      </Form>
      <Link to="/user">
        <Button>other page</Button>
      </Link>
    </div>
  );
};

export default DataTable;
