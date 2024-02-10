import axios from "axios";

const API_URL = "https://backend.hust.edu.ng/hust/api/v1/staff";

// const API_URL = "http://localhost:5000/hust/api/v1/staff";

//Register user
const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

//verify

const verify = async (data) => {
  const response = await axios.get(
    `${API_URL}/verify/${data.id}/${data.string}`
  );

  return response.data;
};

//logout

const logout = async () => {
  localStorage.removeItem("hust_staff");
};

//login

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  if (response.data) {
    localStorage.setItem("hust_staff", JSON.stringify(response.data));
  }
  return response.data;
};

//update

const update = async (staffData, staffId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}/edit-staff/${staffId}`,
    staffData,
    config
  );

  if (response.data) {
    localStorage.setItem("hust_staff", JSON.stringify(response.data));
  }
  console.log(response.data);
  return response.data;
};

const authService = {
  register,
  update,
  logout,
  verify,
  login,
};

export default authService;
