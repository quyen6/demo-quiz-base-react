import axios from "../utils/axiosCustomize";

const postCreateUser = (email, password, username, role, selectedFile) => {
  // submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", selectedFile);

  return axios.post("api/v1/participant", data);
};

const getAllUser = () => {
  return axios.get("api/v1/participant/all");
};

export { postCreateUser, getAllUser };
