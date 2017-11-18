import axios from 'axios';


let base = 'http://121.43.35.110:9000';//

// export const requestLogin = params =>{ return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//, 

// export const getUserList = params => { return axios.get(`api/api/counselors/`+ params.url,{params: params.data  }); };//,

//http://121.43.35.110:9000/api/find/user/by/role/ + 角色 
export const login = params => { return axios.post(`${base}/api/login/` + (params.param || ""), params.data); };//,
export const getUserList = params => { return axios.get(`${base}/api/find/user/by/role/` + (params.param || ""), { params: params.data }); };//,

export const getCustomerList = params => { return axios.get(`${base}/api/customer` + (params.param || ""), { params: params.data }); };//,
//http://121.43.35.110:9000/api/user/profile/59cbb548336a522ad06efe7e
export const getUserDetails = params => { return axios.get(`${base}/api/user/profile/` + (params.param || ""), { params: params.data }); };//,
// export const getOrderList  = params => { return axios.get(`${base}/api/find/user/order/list/`+ (params.param||""),{params: params.data  }); };//,
//http://121.43.35.110:9000/api/user/profile/59cbb548336a522ad06efe7e
export const addUserDetails = params => { return axios.post(`${base}/api/insert/user/` + (params.param || ""), params.data); };//,
export const editUserDetails = params => { return axios.post(`${base}/api/user/profile/` + (params.param || ""), params.data); };//,

//http://121.43.35.110:9000/api/file/upload
export const fileUpload = params => { return axios.post(`${base}/api/file/upload` + (params.param || ""), params.data); };//,
//http://121.43.35.110:9000/api/user/qrcode/59cbb548336a522ad06efe7e
export const getQrcode = params => { return axios.get(`${base}/api/user/qrcode/` + (params.param || ""), { params: params.data }); };//,
//http://121.43.35.110:9000/api/user/add/tips/59cbb548336a522ad06efe7e
export const addTips = params => { return axios.post(`${base}/api/user/add/tips/` + (params.param || ""), { params: params.data }); };//,

//user/delete/tips/{token}/{tipId}
export const delTips = params => { return axios.get(`${base}/api/user/delete/tips/` + (params.param || ""), { params: params.data }); };//,
// http://121.43.35.110:9000/api/user/tips/59cbb548336a522ad06efe7e
export const getTips = params => { return axios.get(`${base}/api/user/tips/` + (params.param || ""), { params: params.data }); };//,
// http://121.43.35.110:9000/api/find/user/order/list/59cbb548336a522ad06efe7e
export const getOrderList = params => { return axios.get(`${base}/api/find/user/order/list/` + (params.param || ""), { params: params.data }); };//,
export const getAllOrderList = params => { return axios.get(`${base}/api/order/` + (params.param || ""), { params: params.data }); };//,
export const getUOrderList = params => { return axios.get(`${base}/api/find/user/unfinished/order/` + (params.param || ""), { params: params.data }); };//,
export const getFOrderList = params => { return axios.get(`${base}/api/find/user/finished/order/` + (params.param || ""), { params: params.data }); };//,
export const getOrderDetials = params => { return axios.get(`${base}/api//order/detials/` + (params.param || ""), { params: params.data }); };//,
//http://121.43.35.110:9000/api/counselors/599108c4336a526a0dc1f9bb
export const getCounselors = params => { return axios.get(`${base}/api/counselors/` + (params.param || ""), { params: params.data }); };//,

export const getUserKeyWord = params => { return axios.post(`${base}/api/find/user/by/keyword/` + (params.param || ""), params.data); };//,

export const delUser = params => { return axios.post(`${base}/api/delete/user/` + (params.param || ""), params.data); };//,

// export const getUserListPage = params => { return axios.get(`${base}/api/counselors/`+ params.url,{params: params.data  }); };//,

// export const removeUser = params =>{ return axios.get(`${base}/api/counselors/`+ params.url,{params: params.data  }); };//,

// export const batchRemoveUser = params =>{ return axios.get(`${base}/api/counselors/`+ params.url,{params: params.data  }); };//,

// export const editUser = params => { return axios.get(`${base}/api/counselors/`+ params.url,{params: params.data  }); };//,

// export const addUser = params => { return instance.get(`${base}/user/add`, { params: params }); }; 

export const getGoodsList = params => { return axios.get(`${base}/api/goods`, { params: params.data }); };//,

export const getGoodsDetails = params => { return axios.get(`${base}/api/goods/details/` + params.token + '/' + params.goodsid, { params: params.data }); };//,

export const addGoodsDetails = params => { return axios.post(`${base}/api/add/goods/` + params.token + (params.param || ""), params.data); };//,
//params => { return axios.post(`api/api/add/goods/`+ params.token),params.data; };

export const editGoodsDetails = params => { return axios.post(`${base}/api/add/goods/` + params.token + (params.param || ""), params.data); };//,

export const delGoods = params => { return axios.get(`${base}/api/goods/remove/` + params.goodsid, { params: params.data }); };

export const upGoods = params => { return axios.get(`${base}/api/goods/` + params.goodsid + '/true', { params: params.data }); };

export const downGoods = params => { return axios.get(`${base}/api/goods/` + params.goodsid + '/false', { params: params.data }); };

export const getRightsOrderList = params => { return axios.get(`${base}/api/find/user/unfinished/order/` + params.token, { params: params.data }); };//,


export const passRefund = params => { return axios.post(`${base}/api/agree/for/refund/` + params.token + (params.param || ""), params.data); };//

export const setNumber = params => { return axios.post(`${base}/api/order/number/` + (params.param || ""), params.data); };//




