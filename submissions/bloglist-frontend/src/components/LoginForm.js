import React, { useState } from 'react'

const LoginForm = ({ handleLogin }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleUsernameChange = event => setUsername(event.target.value)
    const handlePasswordChange = event => setPassword(event.target.value)

    const login = (event) => {
        event.preventDefault()
        console.log('in LOGINFORM component, logging in with', username, password)
        handleLogin({ 
            username: username, 
            password: password 
        })
        setUsername('')
        setPassword('')
    }
    
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={login}>
                <div>
                    username
                    <input 
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    password
                    <input 
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>

    )

}

export default LoginForm