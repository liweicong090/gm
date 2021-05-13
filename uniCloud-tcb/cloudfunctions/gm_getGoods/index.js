'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection("gm_goods").get()
	return res.data
};
