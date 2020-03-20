const A_INDEX = 65;
const Z_INDEX = 91;
const NUMBER_ALPHALBETS = 26;

export const createFakeRow = index => {
  return {
    id: index,
  };
};

export const createRowData = (count, from) => {
  return [...Array(count).keys()].map(i => createFakeRow(from + i + 1));
};

export const prepareAlphabets = () => {
  let columns = [];
  columns.push(
    { key: "id", name: "" },
  )
  for (let i = A_INDEX; i < Z_INDEX; i++) {
    columns.push(
      {
        key: i,
        name: String.fromCharCode(i),
        editable: true,
        resizable: true
      }
    )
  }
  return columns;
}

export const generateColName = (length) => {
  let name = '';
  const times = Math.floor(length / NUMBER_ALPHALBETS);
  const index = length % NUMBER_ALPHALBETS;

  for (let i = 0; i < times + 1; i++) {
    name = name + String.fromCharCode(A_INDEX + index);
  }

  return name;
}