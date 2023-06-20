const Blog = ({blog}) => (
  <div id={blog.id}>
    {blog.title} {blog.author}
  </div>  
)

export default Blog
