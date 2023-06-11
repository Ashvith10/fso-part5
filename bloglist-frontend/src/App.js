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

          setUser(user)
          setUsername('')
          setPassword('')
      } catch(exception) {
      }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
            <div>{user.name} logged in</div>
            &nbsp;
            <div>
                {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
            </div>
          </div>
      )
  }
}

export default App
