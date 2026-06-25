import React,{useState} from 'react'
import { useNavigate, Link, useLocation } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ showPassword, setShowPassword ] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({email,password})
        navigate('/')
    }

    if(loading){
        return (<main><h1>Loading.......</h1></main>)
    }


    return (
        <main>
            <div>
                <h1 className='brand-title'>PrepBuilder</h1>
                <div className="form-container">
                    <h1 style={{ fontSize: '1.8rem' }}>Login</h1>
                    
                    {location.state?.message && (
                        <div style={{ background: 'rgba(46, 204, 113, 0.1)', color: '#2ECC71', padding: '1rem', borderRadius: '0.75rem', fontSize: '0.9rem', textAlign: 'center', marginBottom: '1rem' }}>
                            {location.state.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-wrapper">
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email" id="email" name='email' placeholder='Enter email address' />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <input
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    type={showPassword ? "text" : "password"} id="password" name='password' placeholder='Enter password' />
                                <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    )}
                                </button>
                            </div>
                        </div>
                        <button className='button primary-button' style={{ marginTop: '0.5rem' }}>Login</button>
                    </form>
                <p>Don't have an account? <Link to={"/register"} >Register</Link> </p>
                </div>
            </div>
        </main>
    )
}

export default Login