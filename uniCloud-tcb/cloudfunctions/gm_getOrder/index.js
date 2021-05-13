'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	if(event.userID){
		const result = await db.collection("gm_deal").where({userID:event.userID}).get()
		return result.data
	}else if(event.id){
		const result = await db.collection("gm_deal").where({_id:event.id}).get()
		return result.data[0]
	}
};
