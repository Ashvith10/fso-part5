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
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (loginObject) => {
    try {
      const user = await loginService.login(loginObject)
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage('Login succeeded')
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch(exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const createBlog = async (blogFormObject) => {
    try {
      const createdBlog = await blogService.create(blogFormObject)
      setBlogs(prevState => ([...prevState, createdBlog ]))
      setSuccessMessage(`A new blog ${createdBlog.title} by ${createdBlog.author} added`)
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.setItem('loggedBlogUser', '')
    setUser(null)
    setSuccessMessage('Logged out')
    setTimeout(() => setSuccessMessage(null), 5000)
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
            successMessage={successMessage}
            errorMessage={errorMessage}
          >
            <LoginForm login={handleLogin} />
          </PageComponent>
      }
      {
        user &&
          <div>
            <PageComponent
              title="blogs"
              successMessage={successMessage}
              errorMessage={errorMessage}
            >
              <span>{user.name} logged in</span>
              <input type="button" value="logout" onClick={handleLogout} />
            </PageComponent>
            <Toggleable buttonLabel="new note">
              <BlogForm addBlog={createBlog} />
            </Toggleable>
            <div id="blogs">
              {
                blogs
                  .sort((a, b) => b.likes - a.likes)
                  .map(blog =>
                    <Blog key={blog.id} blog={blog}
                      setBlogs={setBlogs} user={user}/>)
              }
            </div>
          </div>
      }
    </div>
  )
}

export default App
