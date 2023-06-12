import SimpleColumnRenderer from "./simpleColumnRenderer.jsx";
import AmountPerBoxRenderer from "./amountPerBoxRenderer";
import ActionsRenderer from "./actionsRenderer";

export const getColumns = (
  form,
  editingRow,
  onDataUpdate,
  data,
  setEditingRow,
  deleteRow
) => [
  {
    title: "Name",
    dataIndex: "name",
    width: "25%",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, record) => {
      return (
        <SimpleColumnRenderer
          form={form}
          editingRow={editingRow}
          record={record}
          colName={"name"}
          dataText={text}
        />
      );
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
      return (
        <AmountPerBoxRenderer
          form={form}
          editingRow={editingRow}
          record={record}
          onDataUpdate={onDataUpdate}
          data={data}
        />
      );
    },
  },
  {
    title: "Amount",
    dataIndex: "amount",
    width: "25%",
    sorter: (a, b) => a.amount - b.amount,
    render: (text, record) => {
      return (
        <SimpleColumnRenderer
          form={form}
          editingRow={editingRow}
          record={record}
          colName={"amount"}
          dataText={text}
        />
      );
    },
  },
  {
    title: "SKU",
    dataIndex: "sku",
    width: "10%",
    sorter: (a, b) => a.sku.localeCompare(b.sku),
    render: (text, record) => {
      return (
        <SimpleColumnRenderer
          form={form}
          editingRow={editingRow}
          record={record}
          colName={"sku"}
          dataText={text}
        />
      );
    },
  },
  {
    title: "Image",
    dataIndex: "imageUrl",
    width: "5%",
    render: (imageUrl, record) => {
      return (
        <SimpleColumnRenderer
          form={form}
          editingRow={editingRow}
          record={record}
          colName={"imageUrl"}
          dataText={
            <img
              src={imageUrl}
              alt="item"
              style={{ width: "100%", maxWidth: "100px" }}
            />
          }
        />
      );
    },
  },
  {
    title: "Actions",
    width: "10%",
    render: (_, record) => {
      return (
        <ActionsRenderer
          form={form}
          editingRow={editingRow}
          record={record}
          setEditingRow={setEditingRow}
          deleteRow={deleteRow}
        />
      );
    },
  },
];
