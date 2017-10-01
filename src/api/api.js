import axios from 'axios';

let base = '';//
 
// export const requestLogin = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const getUserList = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

//http://121.43.35.110:9000/api/find/user/by/role/ + 角色 
export const login  = params => { return axios.post(`api/api/login/`+ (params.param||""),params.data ); };//, 
export const getUserList  = params => { return axios.get(`api/api/find/user/by/role/`+ (params.param||""),{params: params.data  }); };//, 
//http://121.43.35.110:9000/api/user/profile/59cbb548336a522ad06efe7e
export const getUserDetails  = params => { return axios.get(`api/api/user/profile/`+ (params.param||""),{params: params.data  }); };//, 
export const getOrderList  = params => { return axios.get(`api/api/find/user/order/list/`+ (params.param||""),{params: params.data  }); };//, 
//http://121.43.35.110:9000/api/user/profile/59cbb548336a522ad06efe7e
export const addUserDetails  = params => { return axios.post(`api/api/insert/user/`+ (params.param||""),params.data  ); };//, 
export const editUserDetails  = params => { return axios.post(`api/api/user/profile/`+ (params.param||""),params.data ); };//, 

//http://121.43.35.110:9000/api/file/upload
export const fileUpload  = params => { return axios.post(`api/api/file/upload`+ (params.param||""),params.data ); };//, 

// export const getUserListPage = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const removeUser = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const batchRemoveUser = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const editUser = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const addUser = params => { return instance.get(`${base}/user/add`, { params: params }); }; 