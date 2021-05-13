'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const useState = event.useState
	const _id = event.id
	const updateDB = await db.collection("gm_copum").where({_id}).update({
		useState
	})
	if(event.id != -1){
		const getUser = await db.collection("gm_user").where({userID:event.userID}).get()
		
		const updateUser = await db.collection("gm_user").where({userID:event.userID}).update({copum: getUser.data[0].copum - 1 })
	}
	
	return "ok"
};
