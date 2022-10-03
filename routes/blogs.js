const { uuid } = require('uuidv4');
var express = require('express');
var router = express.Router();

var { validateBlog } = require('../validation/blogs');
const {db} = require("../mongo")

// GET EXAMPLE ROUTE
router.get('/get-one-example', async function(req, res, next) {
try{
	const blogPost = await db().collection("blogs").findOne({
		id: {
		    $exists: true
		}
	})
	res.json({
		success: true,
		post: blogPost
    })
}
    catch (e) {
        console.log(e)
        res.json({
            success: false,
            error: e.toString()
        })
    }
});

// GET ROUTE
router.get('/get-one/:id', async function (req, res, next){
    try {
    const blogID = req.params.id;
    const blogPost = await db().collection('blogs').findOne({
        id: blogID
    })
    if (blogPost === null){
        res.json({
            success: false,
            message: "Blog ID not found."
        })
        return;
    }
    console.log(blogPost)
        if (blogID === blogPost.id){
            res.json({
                success: true,
                post: blogPost
            })
        } 
    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            error: e.toString()
        })
    }
});

// POST ROUTE
router.post('/create-one', async function (req, res, next){
try{
    const title = req.body.title;
    const text = req.body.text; 
    const author = req.body.author; 
    const email = req.body.email;  
    const categories = req.body.categories; 
    const starRating = req.body.starRating; 

    const newBlog = {
        title,
        text,
        author,
        email,
        categories,
        starRating,
        createdAt: new Date(),
        lastModified: new Date(),
        id: uuid()
    }
    // VALIDATION
    const checkBlog = validateBlog(newBlog);
    if (checkBlog.isValid === false){
        res.json({
            success: false,
            message: checkBlog.message
        })
        return;
    };

    await db().collection('blogs').insertOne(
        newBlog
    )
   
    res.json({
        success: true,
        newBlog
    })
} catch (e) {
    console.log(e)
    res.json({
        success: false,
        error: e.toString()
    })
}
});

//PUT ROUTE
router.put('/update-one/:id', async function (req, res, next){
    try {
    const blogID = req.params.id;
    const foundBlog = await db().collection('blogs').findOne({
        id: blogID});
    const title = req.body.title;
    const text = req.body.text; 
    const author = req.body.author; 
    const email = req.body.email;  
    const categories = req.body.categories; 
    const starRating = req.body.starRating; 

if (title !== null && title !== undefined){
        await db().collection('blogs').updateOne(foundBlog, 
                { $set: {
                    title: req.body.title,
                    lastModified: new Date()
                }
        })
        res.json({
            success: true
        })
    }
if (text !== null && text !== undefined){
        await db().collection('blogs').updateOne(foundBlog, 
                { $set: {
                    text: req.body.text,
                    lastModified: new Date()
                }
        })
        res.json({
            success: true
        })
    }
if (author !== null && author !== undefined){
        await db().collection('blogs').updateOne(foundBlog, 
                { $set: {
                    author: req.body.author,
                    lastModified: new Date()
                }
        })
        res.json({
            success: true
        })
    }
if (email !== null && email !== undefined){
        await db().collection('blogs').updateOne(foundBlog, 
                { $set: {
                    email: req.body.email,
                    lastModified: new Date()
                }
        })
        res.json({
            success: true
        })
    }
if (categories !== null && categories !== undefined){
        await db().collection('blogs').updateOne(foundBlog, 
                { $set: {
                    categories: req.body.categories,
                    lastModified: new Date()
                }
        })
        res.json({
            success: true
        })
    }
if (starRating !== null && starRating !== undefined){
        await db().collection('blogs').updateOne(foundBlog, 
                { $set: {
                    starRating: req.body.starRating,
                    lastModified: new Date()
                }
        })
        res.json({
            success: true
        })
    }
    } catch (e) {
        console.log(e)
        res.json({
            success: false,
            error: e.toString()
        })
    }
});

router.delete('/delete-one/:id', async function (req, res, next){
    try{
        const blogID = req.params.id;
        const foundBlog = await db().collection('blogs').findOne({
            id: blogID});
        
        const deleteBlog = await db().collection('blogs').deleteOne(foundBlog);
        res.json({
            success: true
        })
        return deleteBlog
    }
    catch (e) {
        console.log(e)
        res.json({
            success: false,
            error: e.toString()
        })
    }
})
module.exports = router; 