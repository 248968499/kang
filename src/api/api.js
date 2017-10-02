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
//http://121.43.35.110:9000/api/user/qrcode/59cbb548336a522ad06efe7e
export const getQrcode  = params => { return axios.get(`api/api/user/qrcode/`+ (params.param||""),{params: params.data  }); };//, 
//http://121.43.35.110:9000/api/user/add/tips/59cbb548336a522ad06efe7e
export const addTips  = params => { return axios.get(`api/api/user/add/tips/`+ (params.param||""),{params: params.data  }); };//, 

//user/delete/tips/{token}/{tipId}
export const delTips  = params => { return axios.get(`api/api/user/delete/tips/`+ (params.param||""),{params: params.data  }); };//, 
// http://121.43.35.110:9000/api/user/tips/59cbb548336a522ad06efe7e
export const getTips  = params => { return axios.get(`api/api/user/tips/`+ (params.param||""),{params: params.data  }); };//, 

// export const getUserListPage = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const removeUser = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const batchRemoveUser = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const editUser = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const addUser = params => { return instance.get(`${base}/user/add`, { params: params }); }; 

export const getGoodsList  = params => { return axios.get(`api/api/goods`,{params: params.data  }); };//, 

export const getGoodsDetails  = params => { return axios.get(`api/api/`+ params.token+'/'+params.goodsid,{params: params.data  }); };//, 

export const addGoodsDetails  = params => { return axios.post(`api/api/add/gooods/`+ params.token,{params: params.data  }); };

export const editGoodsDetails  = params => { return axios.post(`api/api/add/gooods/`+ params.token,{params: params.data  }); };

export const delGoods  = params => { return axios.get(`api/api/gooods/remove/`+ params.goodsid,{params: params.data  }); };

export const upGoods  = params => { return axios.get(`api/api/gooods/`+ params.goodsid+'/true',{params: params.data  }); };

export const downGoods  = params => { return axios.get(`api/api/gooods/`+ params.goodsid+'/false',{params: params.data  }); };

