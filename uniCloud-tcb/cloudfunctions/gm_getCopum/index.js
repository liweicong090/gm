'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	if(event.userID){
		const userID = event.userID
		const copumDB = await db.collection("gm_copum").where({userID}).get()
		return copumDB.data
	}else if(event._id){
		const _id = event._id
		const copumDB = await db.collection("gm_copum").where({_id}).get()
		return copumDB.data
	}
	
};
