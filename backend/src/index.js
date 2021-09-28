const app = require('./app')
const port = process.env.PORT
const User = require('./models/user')

// const me = new User({
//   firstName: "Romain",
//   lastName: "Zucconi",
//   email: "romain.zucconi2@gmail.com",
//   password: "Red12345!"
// })
// me.save().then(() => {
//   console.log(me)
// }).catch((error) => {
//   console.log(error)
// })

app.listen(port, ()=> {
  console.log(`Server listen on port ${port}`)
})