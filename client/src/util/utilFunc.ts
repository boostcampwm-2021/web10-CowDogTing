import axios from "axios";

export const postApi = async (url: string, postData: object) => {
  const result = await axios.post(url, postData, { withCredentials: true });
  const { status, data } = result;
  if (status >= 400) {
    // eslint-disable-next-line no-alert
    alert(data);
  }
};
