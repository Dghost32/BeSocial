let getDate = () => {
  let date = new Date().toISOString().split("T")[0];
  return date;
};

const validator = (fn) => (req, res) => {
  if (req.body.secret !== process.env.API_PASS) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  return fn(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({
      message: "Error",
    });
  });
};

const response = {
  message: "",
  data: [],
};

module.exports = { getDate, validator, response };
