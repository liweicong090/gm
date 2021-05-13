'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection("gm_user").where({userID:event.userID}).get()
	return res.data
};
