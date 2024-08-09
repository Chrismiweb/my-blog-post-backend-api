const express = require('express')
const port = 4000
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const connectString = process.env.connectString

app.get('/', (req,res)=>{
    res.send("this app is runnin on broswer")
})

// Configure Specific Origins
const corsSpefic = {
    origin: '*',
    optionsSuccessStatus: 200,
  };

 // Use CORS middleware
 app.use(cors(corsSpefic));

// use express
app.use(express.json())

// use body parser
app.use(bodyParser.urlencoded({ extended: false }))

// connect mongoose
async function connectMongoose(){
    await mongoose.connect(connectString)
    console.log("database connected successfully");
    
}

// create a schema
const blogSchema = new mongoose.Schema({
    image :{
        type:  String,
        // require: true
    },
    topic: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
})
// this is the model
const blogModel = new mongoose.model('createBlog', blogSchema)

// create what will be posted
app.post('/api/v1/createBlog', async(req,res)=>{
    const {image, topic, content} = req.body
    if(!topic || !content){
        res.json({error: "please input all credential before posting"})
    }

    const newBlog = await blogModel.create({image, topic, content})
    res.json({newBlog}) 
    
})

// to get individual blog post through the header
app.get('/api/v1/topic/:topic', async(req,res)=>{

    const {topic} = req.params
    // finding the blog post using the blog topic
    const findBlog = await blogModel.findOne({topic})
    // if blogPost not found
    if(!findBlog){
       return res.json({error: "Blog post was not found"})
    }
    return res.json({findBlog})
    
})

// to get all blog post
app.get('/api/v1/allBlogPost', async(req,res)=>{
    const allBlogPost = await blogModel.find()
    return res.json({allBlogPost})
})

// to delete a blog post 
app.delete('/api/v1/topic/:topic', async(req,res)=>{
    const {topic} = req.params;

    const deleteOnePost = await blogModel.findOneAndDelete({topic})
    
        res.json({error: "this blog post is not available"})
if(!deleteOnePost){
    res.status(404).json({error: "this blog post is not found"})
}

return res.json({message:"Blog post deleted successfully!"})
   
})

// to update a blog post
app.patch('path', (req, res) => {
    
});('/api/v1/topic/:topic', async(req,res)=>{
    const {topic} = req.params
    const updateBlog = await blogModel.findOneAndUpdate({topic})

    if(!updateBlog){
       return res.status(404).json({error: "the blog post you want to update was not found"}, req.body,{runValidator:true})
    }

    return res.json({message: "blog was updated successfully"})

})

app.listen(port, async() => {
    console.log(`Server started on port ${port}`);
    await connectMongoose()
});