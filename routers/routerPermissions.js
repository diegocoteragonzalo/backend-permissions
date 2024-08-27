const express = require("express")
const routerPermissions = express.Router()
let permissions = require("../data/permissions")


routerPermissions.get("/", (req, res) => {
	res.json(permissions)
})


routerPermissions.post("/", (req, res) => {
	let text = req.body.text
	let userId = req.body.userId

	let errors = []
	if(text == undefined){
		errors.push("no text in the body")
	}
	if(userId == undefined){
		errors.push("no userId in the body")
	}
	if(errors.length > 0){
		return res.status(400).json({errors: errors})
	}


	let lastId = permissions[permissions.length-1].id
	
	permissions.push({
		id: lastId+1,
		text: text,
		approbedBy: [],
		userId: userId
	})
	
	res.json({ id: lastId+1 })
})


module.exports = routerPermissions