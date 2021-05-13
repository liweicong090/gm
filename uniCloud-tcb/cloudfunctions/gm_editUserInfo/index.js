'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	if(event.phone){
		const phone = event.phone
		const userID = event.userID
		const res = await db.collection("gm_user").where({userID}).update({phone})
		return {
			message:"更新成功",
			code:200
		}
	}else if(event.tenOne){
		const number = event.tenOne
		const userID = event.userID
		const res = await db.collection("gm_user").where({userID}).field({"tenOne":true,"copum":true}).get()
		let isTen = parseInt(number) + parseInt(res.data[0].tenOne) + 1
		
		// let copumNumber = (isTen / 10).toString().split(".")
		let copumNumber = parseFloat(isTen / 10).toFixed(1).split(".")
		const upDateDB = await db.collection("gm_user").where({userID}).update({
			copum:res.data[0].copum + parseInt(copumNumber[0]),
			tenOne: parseInt(copumNumber[1]) - 1
		})
		
		const recordDB = await db.collection("gm_record").add({
			userID,
			time_stick:event.time_stick - 1,
			time:event.time,
			address:event.address,
			total_number:event.total_number
		})
		
		for (let i = 0 ;i < parseInt(copumNumber[0]);i++ ) {
			const recordDB1 = await db.collection("gm_record").add({
				userID,
				time_stick:event.time_stick,
				time:event.time,
				address:event.address,
				total_number:-10
			})
			
			const updateCopum = await db.collection("gm_copum").add({
				userID,
				desc:"1.此券为集十赠一兑换券,凭此券可免费兑换全场任意饮品一杯(不含付费加料);2.此券仅限全国已上线小程序的门店使用,仅限到店自提;3.如果使用本券后发生退款,退款以实际支付的价款为准,本券作返还处理;4.本券仅限本人使用,不可交易与赠送,不与其他优惠同享,不可兑换现金,优惠部分金额不参与成长累积;5.券有效期:兑换后15天内.",
				endTime:Date.now() + 86400000 * 30,
				howToUseNumber: 1,
				startTime:Date.now(),
				title:"全场畅饮一杯",
				useState:0,
				value:"畅饮",
				whichGoods:1
			})
		}
		
		
		// if(isTen>=9){
		// 	let newTenOne = (isTen - 9)
		// 	const upDateDB = await db.collection("gm_user").where({userID}).update({
		// 		copum:res.data[0].copum + 1,
		// 		tenOne: newTenOne - 1
		// 	})
			
		// 	const recordDB1 = await db.collection("gm_record").add({
		// 		userID,
		// 		time_stick:event.time_stick  - 1,
		// 		time:event.time,
		// 		address:event.address,
		// 		total_number:event.total_number
		// 	})
			
			// const recordDB = await db.collection("gm_record").add({
			// 	userID,
			// 	time_stick:event.time_stick,
			// 	time:event.time,
			// 	address:event.address,
			// 	total_number:-10
			// })
		// 	return "ok"
		// }else{
		// 	const upDateDB = await db.collection("gm_user").where({userID}).update({
		// 		tenOne: isTen
		// 	})
			
			// const recordDB = await db.collection("gm_record").add({
			// 	userID,
			// 	time_stick:event.time_stick,
			// 	time:event.time,
			// 	address:event.address,
			// 	total_number:event.total_number
			// })
		// 	return "ok"
		// }
		
	}
	
};
