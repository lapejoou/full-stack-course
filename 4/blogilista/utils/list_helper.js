const _ = require('lodash');

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

const mostBlogs = (blogs) => {
    const authorBlogCount = _.countBy(blogs, 'author');
  
    const maxAuthor = _.maxBy(Object.keys(authorBlogCount), (author) => authorBlogCount[author]);
  
    return {
      author: maxAuthor,
      blogs: authorBlogCount[maxAuthor]
    };
  };

  
  const mostLikes = (blogs) => {
    const likesByAuthor = _(blogs)
      .groupBy('author')
      .map((authorBlogs, author) => ({
        author: author,
        likes: _.sumBy(authorBlogs, 'likes')
      }))
      .maxBy('likes');
  
    return likesByAuthor || {};
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }