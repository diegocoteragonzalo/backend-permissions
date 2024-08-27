const express = require("express")
const app = express()
let port = 8081

app.use(express.json())


let routerPermissions = require("./routers/routerPermissions")
let routerUsers = require("./routers/routerUsers")

app.use("/permissions", routerPermissions)
app.use("/users", routerUsers)

app.listen(port, () => {
	console.log("http://localhost:" + port)
})
