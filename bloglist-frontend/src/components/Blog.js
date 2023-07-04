import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
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

  const handleLike = () => updateBlog(blog)
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle} id={blog.id}>
      <div className="blog-header">
        <span className="blog-title">
          {blog.title}
        </span>
        &nbsp;
        <span className="blog-author">
          {blog.author}
        </span>
        &nbsp;
        <input
          type="button"
          className="show"
          value="view"
          style={hideWhenVisible}
          onClick={() => setBlogVisible(true)}
        />
        <input
          type="button"
          className="hide"
          value="hide"
          style={showWhenVisible}
          onClick={() => setBlogVisible(false)}
        />
      </div>
      <div className="blog-details" style={showWhenVisible}>
        <div className="blog-url">{blog.url}</div>
        <div className="blog-about-likes">
          likes <span className="blog-likes">{blog.likes}</span>&nbsp;
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
