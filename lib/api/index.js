import axios from 'axios';

const apiHost = 'https://s01.jaces.org';

export const login = async client_id => {
  try {
    const resp = await axios.post(`${apiHost}/api/clients/login`, {
      client_id: client_id,
    });
    return resp.data.token;
  } catch (e) {
    console.warn(e);
    await Promise.reject(e.data);
  }
};

export const getHosts = async token => {
  try {
    const curToken = token;
    console.log('token from api', token);
    const resp = await axios.get(`${apiHost}/api/pvt/hosts/get`, {
      headers: {
        authorization: 'Bearer ' + curToken,
      },
    });
    return resp.data;
  } catch (e) {
    console.log('!!!!!!!!!!!!!!!!!!!!!');
    console.log(e.response);
    console.log('!!!!!!!!!!!!!!!!!!!!!');
    await Promise.reject(e);
  }
};

export const updateHost = async (token, host) => {
  try {
    const resp = await axios.post(`${apiHost}/api/pvt/hosts/updatebyid`, host, {
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    return resp.data;
  } catch (e) {
    console.warn(e.data);
    await Promise.reject(e);
  }
};

export const getHostById = async (token, id) => {
  try {
    const resp = await axios.get(`${apiHost}/api/pvt/hosts/gethostbyid`, {
      headers: {
        authorization: 'Bearer ' + token,
      },
      params: {
        _id: id,
      },
    });
    return resp.data;
  } catch (e) {
    console.warn(e.data);
    await Promise.reject(e);
  }
};

export const getConfigs = async (token) => {
    try {
      const resp = await axios.get(`${apiHost}/api/admin/configs/get`);
      return resp.data;
    } catch (error) {
      console.log(error);
      await Promise.reject(error)
    }
}

