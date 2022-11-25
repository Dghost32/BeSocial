let getDate = () => {
  let date = new Date().toISOString().split("T")[0];
  return date;
};

module.exports = { getDate };
