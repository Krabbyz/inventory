import { Button, Table, Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getColumns } from "./dataTableColumns/getColumns";
import "./dataTable.css";

const DataTable = ({ data, onDataUpdate }) => {
  const [editingRow, setEditingRow] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Finish editing row
  const onFinish = (values) => {
    const updatedDataSource = [...data];
    updatedDataSource.splice(editingRow, 1, {
      ...values,
      key: editingRow,
      amountPerBox: parseInt(values.amountPerBox, 10),
      amount: parseInt(values.amount, 10),
      imageUrl: values.imageUrl || "https://i.imgur.com/cT7B2nD.png",
    });

    onDataUpdate(updatedDataSource);
    setEditingRow(null);
  };

  // looks for an available key to assign to an item
  const getNextAvailableKey = () => {
    let nextKey = 0;
    const isKeyTaken = (key) => {
      return data.some((row) => row.key === String(key));
    };
    while (isKeyTaken(nextKey)) {
      nextKey++;
    }
    return String(nextKey);
  };

  /*
  const addNewRow2 = async () => {
    const response = await fetch("http://localhost:8000/tracking-list");
    const payload = await response.json();

    console.log(payload);
  };
  */

  const addNewRow = (values) => {
    const newRow = {
      key: getNextAvailableKey(),
      name: values.name,
      amountPerBox: parseInt(values.amountPerBox, 10),
      amount: parseInt(values.amount, 10),
      imageUrl: values.imageUrl || "https://i.imgur.com/cT7B2nD.png",
      sku: values.sku,
    };
    const updatedDataSource = [...data, newRow];
    onDataUpdate(updatedDataSource);
  };

  const deleteRow = (key) => {
    const updatedDataSource = data.filter((row) => row.key !== key);
    onDataUpdate(updatedDataSource);
  };

  // allows search bar to look for items
  const filterData = () => {
    if (searchText.trim() === "") {
      return data;
    }

    return data.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  /* Modals */
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        addNewRow(values); // Assuming addNewRow has been modified to accept values
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  /* Render columns */
  const columns = getColumns(
    form,
    editingRow,
    onDataUpdate,
    data,
    setEditingRow,
    deleteRow
  );

  return (
    <div className="pad">
      <Input.Search
        className="searchBar-large margin-bot"
        placeholder="Search by name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={showModal} type="primary" className="margin-bot">
        Add new item
      </Button>
      <Modal
        title="Add New Item"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form}>
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
            <Input placeholder="Image URL" />
          </Form.Item>
        </Form>
      </Modal>
      <Form form={form} onFinish={onFinish} className="margin-bot">
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
