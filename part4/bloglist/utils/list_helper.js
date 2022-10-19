const totalLikes = (blogs) => {
  const output = blogs.reduce((total, blog) => {
    return total += blog.likes
  }, 0)
  return output
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce((favorite, blog) => {
    return blog.likes >= favorite.likes ? blog : favorite
  }, { likes: 0 })
  return favorite
}

const mostBlogs = (blogs) => {
  const blogCount = {}
  blogs.forEach(blog => {
    if (!blogCount[blog.author]) {
      blogCount[blog.author] = 1
    } else {
      blogCount[blog.author] += 1
    }
  })
  const output = {}
  for (const [author, blogs] of Object.entries(blogCount)) {
    if (!output.author || output.blogs < blogs) {
      output.author = author
      output.blogs = blogs
    }
  }
  return output.author ? output : null
}

const mostLikes = (blogs) => {
  const likesCount = {}
  blogs.forEach(blog => {
    if (!likesCount[blog.author]) {
      likesCount[blog.author] = blog.likes
    } else {
      likesCount[blog.author] += blog.likes
    }
  })
  const output = {}
  for (const [author, likes] of Object.entries(likesCount)) {
    if (!output.author || output.likes < likes) {
      output.author = author
      output.likes = likes
    }
  }
  return output.author ? output : null
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}