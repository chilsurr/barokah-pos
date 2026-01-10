import { Layout, Button,Input} from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"
import { postLogin } from '../utils/api';
import "../style/login.css"
const { Content} = Layout;

function Login() {
    const navigate= useNavigate();
    const [username,setUsername] = useState ()
    const [password,setPassword] = useState ()
    console.log(username)
    console.log(password)
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
           const data = {"username" : username, "password": password}
            console.log(data)
            const results = await postLogin(data)
            console.log(results)
            console.log(results.status)
            if (results.status === 200 ) {
                console.log(results.data)
                localStorage.setItem('access_token', results.data.access);
                localStorage.setItem('refresh_token', results.data.refresh);
                console.log('Login berhasil!');
                navigate("/")
            } else {
                alert('Login gagal!');
            } 
        } catch (error) {
            console.error('Login error:', error.response?.data || error.message);
            alert('Anda tidak berhak login, username atau password salah');
        }
        
    }

    return(
        <>
            <Content className="content-login">
                <div className="login">
                    <div>Username</div>
                    <Input className="login-input Username" 
                            type="text" 
                            placeholder="Username" 
                            onChange={(e) => setUsername(e.target.value)}
                    />
                    <div>Password</div>
                    <Input className="login-input password" 
                            type="password" 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="login-button">
                        <Button className="btn-back" onClick={()=> navigate("/home-dashboard/")}>Back</Button>
                        <Button className="btn-login" onClick={handleSubmit}>Login</Button>
                    </div>
                </div>
            </Content>
        </>
    )
}

export default Login