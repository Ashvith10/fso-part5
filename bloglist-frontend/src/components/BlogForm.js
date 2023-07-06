import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = () => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={createBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              className="blog-title-field"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              className="blog-author-field"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="URL"
              className="blog-url-field"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <input className="createNote" name="Create" type="submit" value="create"/>
        </form>
      </div>
    </div>
  )
}

export default BlogForm
