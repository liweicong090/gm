'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	const id = event.id
	const result = await db.collection("gm_goods_detail").where({productId:id}).get()
	return result
};
