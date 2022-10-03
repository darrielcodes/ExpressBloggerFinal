const validateBlog = (blog) => {

    if (blog.title === undefined || typeof(blog.title) !== "string" || blog.title.length > 30){
        return {
            isValid: false,
            message: "Title is required, must be a string and 30 characters or less."
		}
    };
    if (blog.text === undefined || typeof(blog.text) !== "string"){
        return {
            isValid: false,
            message: "Text is required and must be a string."
		}
    };
    if (blog.author === undefined || typeof(blog.author) !== "string"){
        return {
            isValid: false,
            message: "Author is required and must be a string."
		}
    };
    // if (blog.email !== undefined && blog.email.split("@").length > 1 || typeof(blog.email) !== "string"){
    //         return {
    //         isValid: false,
    //         message: "Email must be a string and must contain only one @ symbol."
    //         }
    //     }; 
        
};

module.exports = {
    validateBlog
};