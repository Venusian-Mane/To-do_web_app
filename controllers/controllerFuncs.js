// DATABASE CHECK

// I ceated the function below to check if the user is actually in the DB

function inDatabase(dbResult, username) {
  let result = false;
  dbResult.map((user) => {
    if (user.userName == username) {
      result = true;
    }
  });
  return result;
}
module.exports = { inDatabase };
