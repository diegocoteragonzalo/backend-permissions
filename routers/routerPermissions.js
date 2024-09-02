const express = require("express")
const routerPermissions = express.Router()

let jwt = require("jsonwebtoken")
let permissions = require("../data/permissions")
let users = require("../data/users")
let authorizers = require("../data/authorizers")


routerPermissions.get("/", (req, res) => {
	res.json(permissions)
})


routerPermissions.put("/:id/approbedBy", (req, res) => {
	
	let permissionId = req.params.id

	let apiKey = req.query.apiKey
	
	let infoApiKey = null
	
	try {
		infoApiKey = jwt.verify(apiKey, "secret");
	}
	catch(error){
		return res.status(401).json({ error: "invalid token"})
	}
	
	let user = users.find(u => u.id == infoApiKey.id)
	
	console.log("User role: " + user.id);
	
	if(user.role != "admin"){
		return res.status(401).json({ error: "user is not an admin"});
	}
	
	
	let permission = permissions.find( 
		p => p.id == permissionId && user.id == infoApiKey.id )
	if(permission == undefined){
		return res.status(400).json({error: "no permissionId"})
	}
	
	permission.approbedBy.push(user.id)
	
	res.json(permission)

})


routerPermissions.post("/", (req, res) => {
	let text = req.body.text

	let apiKey = req.query.apiKey
	
	let infoApiKey = null
	try {
		infoApiKey = jwt.verify(apiKey, "secret");
	}
	catch(errors){
		return res.status(401).json({ error: "invalid token"})
	}
	
	let user = users.find( u => u.id == infoApiKey.id)
	if(user.role != "admin"){
		return res.status(401).json({ error: "user is not an admin"});
	}
	
	let errors = []
	
	if(text == undefined){
		errors.push("no text in the body")
	}
	if(errors.length > 0){
		return res.status(400).json({errors: errors})
	}


	let lastId = permissions[permissions.length-1].id
	
	permissions.push({
		id: lastId+1,
		text: text,
		approbedBy: [],
		userId: infoApiKey.id
	})
	
	res.json({ id: lastId+1 })
})


module.exports = routerPermissions
