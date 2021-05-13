'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const dealNumber = await db.collection("gm_deal").where({day:event.day}).get()
	const takeMealNumber =  dealNumber.data.length
	const insertDB = await db.collection("gm_deal").add({
		takeMealNumber:takeMealNumber + 1,
		bill:event.bill,
		address:event.address,
		m_price:event.m_price,
		total_number:event.total_number,
		time:event.time,
		day:event.day,
		make_state:event.make_state,
		userID:event.userID,
		time_stick:event.time_stick,
		copum:event.copum,
		copum_price:event.copum_price
	})
	return insertDB
};
