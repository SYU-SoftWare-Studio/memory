import { v4 as uuidv4 } from 'uuid';
import compress from '../utils/compress';
import API from '../api';

const DOMAIN = 'https://upload-z2.qiniup.com';
const SUB_DOMAIN = 'pic.syustudio.club';

export default class SYU {
  static getToken = async () => {
    const { data } = await API.fetchToken();
    return data;
  };

  static uploadPic = async (req) => {
    const token = await SYU.getToken();
    let fileType = req.file.type.split('/')[1];
    if (fileType === 'jpeg') {
      fileType = 'jpg';
    }
    const key = `${uuidv4().replace(/-/g, '')}${new Date().valueOf()}.${fileType}`;
    const file = await compress(req.file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('token', token);
    formData.append('key', key);
    const link = await API.uploadPic(DOMAIN, formData);
    return `http://${SUB_DOMAIN}/${link.data.key}`;
  };
}
