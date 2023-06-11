import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
      event.preventDefault()
      try {
          const user = await loginService
              .login({username, password})
          window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

          setUser(user)
          setUsername('')
          setPassword('')
      } catch(exception) {
      }
  }

  const handleLogout = async () => {
      window.localStorage.setItem('loggedBlogUser', '')
      setUser(null)
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
             />
        } else {
      return (
          <div>
            <h2>blogs</h2>
            <div>
                <span>{user.name} logged in</span>
                <input
                    type="button"
                    value="logout"
                    onClick={handleLogout}
                />
            </div>
            &nbsp;
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
          </div>
      )
  }
}

export default App
