const { PrismaClient } = require('@prisma/client')
var express = require('express')
const prisma = new PrismaClient()
const port = 3000
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(bodyParser.urlencoded({extended: false}))




//function as sencond param. this function told us that
// if there is any response coming back from a client 
// of '/' 
app.get('/',function(request,response){
    response.send('All dummy data')
    // always have to send response back  
}
)


//create a server open connection and listen on certain port
app.listen(port,
    function(){console.log("API running on port 3000")})

//create 
app.post('/post', function (request, response){
  const {title, content, authorEmail} = request.body
  const post = prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { email: authorEmail } },
    },
  })
  response.json(post)
})

//update
app.put('/books/:id', async (req, res) => {
  const { id } = req.params
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  })
  res.json(post)
  response.status(200).send('Done update ')
})

//delete
app.delete('/book/:id', function (req, res){
  const bookId = req.params.bookId

  if (!bookId || bookId === ""){
    response.status(500).send({error:"You must provide correct id"})
} else{
  const book = prisma.user.delete({
    where: {
      bookId,
    },
  })
  res.json(book)

}

})





