const app = require('./app')
const port = process.env.PORT
const User = require('./models/user')

app.listen(port, ()=> {
  console.log(`Server listen on port ${port}`)
})