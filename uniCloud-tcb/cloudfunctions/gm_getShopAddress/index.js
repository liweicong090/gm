'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const res = await db.collection("gm_shop").get()
	return res.data
};
