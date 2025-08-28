const express = require(`express`)
const router = require("./routes")
const app = express()
const session = require(`express-session`)
const port = 3000

app.set(`view engine`, `ejs`)
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(session({
  secret: 'klikgigi rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24
   },
}))



app.use(`/`, router)





app.listen(port, () => {
  console.log(`Web server is running on port ${port}`);
})