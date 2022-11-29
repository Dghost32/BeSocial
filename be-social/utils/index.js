import axios from "axios";

const getFirstName = (fullName) => fullName.split(" ")[0];

const getQuotes = async () => {
  try {
    let res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/quotes`);
    let data = res.data;
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

export { getFirstName, getQuotes };
