import axios from 'axios';

let base = '';//
 
// export const requestLogin = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const getUserList = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

//http://121.43.35.110:9000/api
export const getUserList  = params => { return axios.get(`api/api/find/user/by/role/`+ params.param,{params: params.data  }); };//, 

// export const getUserListPage = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const removeUser = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const batchRemoveUser = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const editUser = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const addUser = params => { return instance.get(`${base}/user/add`, { params: params }); }; 