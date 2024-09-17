import SquareDatabaseHelper from "./dist/index.js";
try {
  const squareDatabaseHelper = new SquareDatabaseHelper();

  // Example: Insert Rows
  let insertData = [{ test_text: "example" }];
  let insertDataOutput = await squareDatabaseHelper.insertRows(
    insertData,
    "square",
    "public",
    "test"
  );
  console.log(insertDataOutput);

  //Example: Get Rows
  let getRowsfilters = {};
  let getRowsOutput = await squareDatabaseHelper.getRows(
    getRowsfilters,
    "square",
    "public",
    "test",
    true,
    [],
    1,
    0
  );
  console.log(getRowsOutput);

  // Example: Edit Rows
  let editData = { test_text: "edited" };
  let editFilters = { test_text: "example" };
  let editRowsOutput = await squareDatabaseHelper.editRows(
    editData,
    editFilters,
    "square",
    "public",
    "test"
  );
  console.log(editRowsOutput);

  // Example: Delete Rows
  let deleteFilters = { test_text: "edited" };
  let deleteRowsOutput = await squareDatabaseHelper.deleteRows(
    deleteFilters,
    "square",
    "public",
    "test"
  );
  console.log(deleteRowsOutput);
} catch (err) {
  console.error(err);
}
