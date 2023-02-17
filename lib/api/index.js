import axios from 'axios';

const apiHost = 'https://s01.jaces.org';

export const register = async client_id => {
  try {
    await axios.post(`${apiHost}/api/clients/register`, {client_id: client_id})
    const resp = await axios.post(`${apiHost}/api/clients/login`, {
      client_id: client_id,
    });
    return resp.data.token;
  } catch (error) {
    console.warn(error.message);
    await Promise.reject(error);
  }
}

export const unregisterHost = async (id, token) =>{
  try {
    const resp = await axios.post(`${apiHost}/api/pvt/hosts/unregister/${id}`, {}, {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
    return resp.data
  }catch(e){
    console.warn(e.message);
    await Promise.reject(e);
  }
}

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

export const sendAction = async (host_id, action, conf_id, token) => {
  try {
    const uri = `${apiHost}/api/pvt/containers/actions/set/${host_id}`
    const resp = await axios.post(uri, {
      action: action,
      conf_id: conf_id,
    }, {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
    console.log(resp.data);
    return resp.data.id
  }catch(e){
    console.log(e.message);
    await Promise.reject(e)
  }
}

export const getActionStatus = async (id, token) =>{
  try {
    const uri = `${apiHost}/api/pvt/containers/actions/status/${id}`
    const resp = await axios.get(uri,
     {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
    return resp.data
  }catch(e){
    console.log(e.message);
    await Promise.reject(e)
  }
}

export const getLogs = async (conf_id, token) =>{
  try {
    
    const resp = await axios.get(`${apiHost}/api/pvt/containers/logs/get`, {
      params: {
        container_id: conf_id,
      },
      headers: {
        'authorization': 'Bearer ' + token
      }
    });
    console.log(resp.data);
    return resp.data;
  } catch (error) {
    console.log(error);
    await Promise.reject(error)
  }
}

export const createConfig = async (config, host_id, hostname, token)=>{
  try {
    const uri = `${apiHost}/api/pvt/containers/create`
    const resp = await axios.post(uri, {
      host_id: host_id,
      config: config,
      hostname: hostname
    }, {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
    return resp.data
  } catch (error) {
    console.log(error);
    await Promise.reject(error.message);
  }
}

export const updateConfig = async (config, host_id, hostname, token) =>{
  try {
    const uri = `${apiHost}/api/pvt/containers/update`
    const resp = await axios.post(uri, {
      host_id: host_id,
      config: config,
      hostname: hostname
    }, {
      headers: {
        'authorization': 'Bearer ' + token
      }
    })
    return resp.data
  } catch (error) {
    console.log(error);
    await Promise.reject(error.message);
  }
}

