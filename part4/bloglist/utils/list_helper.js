const totalLikes = (blogs) => {
  const output = blogs.reduce((total, blog) => {
    return total += blog.likes
  }, 0)
  return output
}

module.exports = {
  totalLikes
}