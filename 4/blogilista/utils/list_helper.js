const dummy = (blogs) => {
    return 1;
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;

    return blogs.reduce((favBlog, blog) => {
        return blog.likes > favBlog.likes ? blog : favBlog;
    })
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }