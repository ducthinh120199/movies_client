import axios from "axios";
import { REACT_APP_BASE_URL,TOKEN_KEY } from "../utils/config"
import { removeToken } from "../utils/auth"

export const loginApi = async (payload: object) => {
  const response = await axios.post(`${REACT_APP_BASE_URL}/login`, payload);
  return response;
};

export const logout = () => {
  removeToken(); // Xóa token trong localStorage
  window.location.reload(); // Tải lại trang để đăng nhập lại
};