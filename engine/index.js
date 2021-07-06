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

  static fetchIndexPic = async () => {
    const { data } = await API.fetchIndexPic();
    return data.data;
  };

  static fetchUploadPic = async () => {
    const { data } = await API.fetchUploadPic();
    return data.url;
  };

  static uploadArticle = async (params) => {
    const { data } = await API.uploadArticle(params);
    return data;
  };

  static fetchPic = async () => {
    const { data } = await API.fetchPic();
    return data.data;
  };

  static randomColor = () => {
    const color = [
      '#79e5e8',
      '#7de879',
      '#ffaaaa',
      '#66b1ff',
      '#b672d6',
      '#f13f7c',
      '#0accc8',
      '#FF6666',
      '#66CCCC',
      '#CC99CC',
      '#666699',
      '#336699',
      '#99CC33',
    ];
    return color[Math.ceil(Math.random() * color.length)];
  };
}
