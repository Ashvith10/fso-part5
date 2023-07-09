import { useState, useEffect } from 'react'
import './App.css'

import Blog from './components/Blog'
import PageComponent from './components/PageComponent'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [info, setInfo] = useState({ message: null })

  const notifyWith = (message, type) => {
    setInfo({ message, type })
    setTimeout(() => setInfo({ message: null }), 3000)
  }

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notifyWith('Login succeeded', 'success')
    } catch(exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const createBlog = async (blogFormObject) => {
    try {
      const createdBlog = await blogService.create(blogFormObject)
      setBlogs(prevState => ([...prevState, createdBlog ]))
      notifyWith(`A new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success')
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const updateBlog = async (blog) => {
    try {
      const updatedBlog = await blogService
        .update(blog.id, { likes: blog.likes + 1 })
      setBlogs(prevState => prevState.map(savedBlog =>
        (blog.id === savedBlog.id) ? updatedBlog : savedBlog))
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.destroy(id)
      setBlogs(prevState => prevState
        .filter(savedBlog => id !== savedBlog.id))
    } catch (exception) {
      notifyWith(exception.response.data.error, 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.setItem('loggedBlogUser', '')
    setUser(null)
    notifyWith('Logged out', 'success')
  }

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
    if (loggedBlogUser) {
      const user = JSON.parse(loggedBlogUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  return (
    <div>
      {
        !user &&
          <PageComponent
            title="log in to application"
            info={info}
          >
            <LoginForm login={handleLogin} />
          </PageComponent>
      }
      {
        user &&
          <div>
            <PageComponent
              title="blogs"
              info={info}
            >
              <span>{user.name} logged in</span>
              <input className="logout" type="button" value="logout" onClick={handleLogout} />
            </PageComponent>
            <Toggleable affirmLabel="new note" cancelLabel="cancel">
              <BlogForm addBlog={createBlog} />
            </Toggleable>
            <div className="blogs">
              {
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog =>
                    <Blog key={blog.id} blog={blog}
                      setBlogs={setBlogs}
                      updateBlog={updateBlog}
                      deleteBlog={deleteBlog}
                      user={user}/>)
              }
            </div>
          </div>
      }
    </div>
  )
}

export default App
