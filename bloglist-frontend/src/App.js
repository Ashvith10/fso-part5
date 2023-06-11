import { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateNew from './components/CreateNew'
import blogService from './services/blogs'
import loginService from './services/login'
import Success from './components/Success'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
      event.preventDefault()
      try {
          const user = await loginService
              .login({username, password})
          window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

          blogService.setToken(user.token)
          setUser(user)
          setUsername('')
          setPassword('')

          setSuccessMessage('Login succeeded')
          setTimeout(() => setSuccessMessage(null), 5000)
      } catch(exception) {
          setErrorMessage(exception.response.data.error)
          setTimeout(() => setErrorMessage(null), 5000)
      }
  }

  const createBlog = async (event) => {
      event.preventDefault()

      try {
          const createdBlog = await blogService.create({title, author, url})
            
          setBlogs(prevState => ([...prevState, createdBlog ]))
          setTitle('')
          setAuthor('')
          setUrl('')

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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
      const loggedBlogUser = window.localStorage.getItem('loggedBlogUser')
      if (loggedBlogUser) {
          const user = JSON.parse(loggedBlogUser)
          blogService.setToken(user.token)
          setUser(user)
      }
  }, [])

  if (user === null) {
      return <LoginForm
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLogin={handleLogin}
                successMessage={successMessage}
                errorMessage={errorMessage}
             />
        } else {
      return (
          <div>
            <h2>blogs</h2>
            <Success message={successMessage}/>
            <Error message={errorMessage}/>
            <div>
                <span>{user.name} logged in</span>
                <input
                    type="button"
                    value="logout"
                    onClick={handleLogout}
                />
            </div>
            <CreateNew
                title={title}
                setTitle={setTitle}
                author={author}
                setAuthor={setAuthor}
                url={url}
                setUrl={setUrl}
                createBlog={createBlog}
            />
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
          </div>
      )
  }
}

export default App
