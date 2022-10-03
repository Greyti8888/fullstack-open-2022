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

module.exports = {
  totalLikes,
  favoriteBlog
}