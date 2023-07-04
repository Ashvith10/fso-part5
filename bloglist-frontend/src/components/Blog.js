import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogVisible, setBlogVisible] = useState(null)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const handleLike = async () => {
    const updatedBlog = await blogService
      .update(blog.id, { ...blog, likes: blog.likes + 1, user: blog.user.id })
    setBlogs(prevState => prevState.map(savedBlog =>
      (blog.id === savedBlog.id) ? updatedBlog : savedBlog))
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      await blogService.destroy(blog.id)
      setBlogs(prevState => prevState.filter(savedBlog => blog.id !== savedBlog.id))
    }
  }

  return (
    <div style={blogStyle} id={blog.id}>
      <div className="blog-title">
        {blog.title} {blog.author}
        &nbsp;
        <input
          type="button"
          value="view"
          style={hideWhenVisible}
          onClick={() => setBlogVisible(true)}
        />
        <input
          type="button"
          value="hide"
          style={showWhenVisible}
          onClick={() => setBlogVisible(false)}
        />
      </div>
      <div className="blog-details" style={showWhenVisible}>
        <div className="blog-url">{blog.url}</div>
        <div className="blog-likes">
          likes {blog.likes}&nbsp;
          <input
            type="button"
            value="like"
            onClick={handleLike}
          />
        </div>
        <div className="blog-user">{blog.user.name}</div>
        {
          (blog.user.name === user.name) &&
                    (<div id="delete">
                      <input
                        type="button"
                        value="delete"
                        onClick={handleDelete}
                      />
                    </div>)
        }
      </div>
    </div>
  )
}

export default Blog
