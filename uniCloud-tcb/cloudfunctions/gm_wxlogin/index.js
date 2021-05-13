'use strict';
const db = uniCloud.database()
const md5 = require("js-md5")
exports.main = async (event, context) => {
	const code = event.code
	const userInfo = event.userInfo
	const login_res = await uniCloud.httpclient.request("https://api.weixin.qq.com/sns/jscode2session",{
		data:{
			appid:'wxa135210c07bcf935',
			secret:'e93171fe29afabbb6abf36eff0b5a350',
			js_code:code,
			grant_type:'authorization_code'
		},
		dataType: 'json'
	})
	let secret = `${login_res.data.openid}gmwxopenid`
	let time = new Date()
	const userID = md5(secret)
	const userInDB = await db.collection("gm_user").where({userID}).get()
	if(userInDB.data.length === 0){
		const add_res = await db.collection("gm_user").add({
			userID,
			...userInfo,
			createTime:time.toGMTString(),
			lastLoginTime:time.toGMTString(),
			level:1,
			copum:0,
			tenOne:-1,
			phone:"",
			birthDay:""
		})
		
		const res = await db.collection("gm_user").where({userID}).get()
		
		return {
			message:"登陆成功",
			status:200,
			token:userID,
			userInfo: res.data[0]
		}
	}else{
		const update_res = await db.collection("gm_user").where({userID}).update({
			...userInfo,
			lastLoginTime:time.toGMTString()
		})
		
		const res = await db.collection("gm_user").where({userID}).get()
		
		return {
			message:"更新成功",
			status:200,
			token:userID,
			userInfo: res.data[0]
		}
	}
};
