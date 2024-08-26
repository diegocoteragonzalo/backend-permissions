const express = require("express")
const app = express()
let port = 8081

app.use(express.json())


let routerPermissions = require("./routers/routerPermissions")
app.use("/permissions", routerPermissions)


app.listen(port, () => {
	console.log("http://localhost:" + port)
})
