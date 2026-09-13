const STORAGE_KEY = "inventory-demo-items";
const DEFAULT_IMAGE_URL = "https://i.imgur.com/cT7B2nD.png";

const asNumber = (value, fallback = 0) => {
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

export const normalizeInventory = (items) =>
  items
    .map((item, index) => {
      const id = asNumber(item.id ?? item.key, index + 1);

      return {
        ...item,
        id,
        key: id,
        amountPerBox: asNumber(item.amountPerBox, 1),
        amount: asNumber(item.amount),
        imageUrl: item.imageUrl || DEFAULT_IMAGE_URL,
      };
    })
    .sort((a, b) => a.id - b.id);

export const loadInventory = async () => {
  const savedItems = window.localStorage.getItem(STORAGE_KEY);

  if (savedItems) {
    return normalizeInventory(JSON.parse(savedItems));
  }

  const response = await fetch(`${process.env.PUBLIC_URL}/inventory.json`);
  if (!response.ok) {
    throw new Error(`Could not load inventory.json (${response.status})`);
  }

  return normalizeInventory(await response.json());
};

export const saveInventory = (items) => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(normalizeInventory(items))
  );
};

export const getNextInventoryId = (items) => {
  const maxId = items.reduce(
    (max, item) => Math.max(max, asNumber(item.id ?? item.key)),
    0
  );
  return maxId + 1;
};
