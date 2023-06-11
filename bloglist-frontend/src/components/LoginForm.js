import Success from './Success'
import Error from './Error'

const LoginForm = ({username, setUsername, password, setPassword, handleLogin, successMessage, errorMessage}) => {

    return (
        <div>
            <h1>log in to application</h1>
            <Success message={successMessage}/>
            <Error message={errorMessage}/>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({target}) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({target}) => setPassword(target.value)}
                    />
                </div>
                <input type="submit" value="login" />
            </form>
        </div>)
}

export default LoginForm
