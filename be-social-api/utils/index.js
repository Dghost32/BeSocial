let allowedOrigins = "http://localhost:3000";

let getDate = () => {
  let date = new Date()
    .toLocaleString("es-CO", {
      timeZone: "America/Bogota",
    })
    .split(",")[0]
    .replace(/\//g, "-");
  // Remove comma
  return date;
};

const validator = (fn) => (req, res) => {
  // const source url
  var origin = req.get("origin");
  // if
  if (origin !== allowedOrigins) {
    return res.status(403).json({ message: "Not allowed" });
  }

  return fn(req, res).catch((err) => {
    console.error(err);
    res.status(500).json({
      message: "Error",
    });
  });
};

let sortObjectBy = (obj, key) => {
  return obj.sort((a, b) => {
    let x = a[key];
    let y = b[key];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const response = {
  message: "",
  data: [],
};

module.exports = {
  getDate,
  validator,
  response,
  sortObjectBy,
  capitalizeFirstLetter,
  allowedOrigins,
};
