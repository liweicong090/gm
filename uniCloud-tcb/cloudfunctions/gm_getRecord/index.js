'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const record = await db.collection("gm_record").where({userID:event.userID}).get()
	record.data.sort((a,b) => {
		return b.time_stick - a.time_stick
	})
	return record.data
};
