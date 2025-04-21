import React from 'react'
import './style/login.css'
import { useNavigate } from 'react-router-dom'

export function Login(){
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        // Bạn có thể thêm logic kiểm tra email/mật khẩu ở đây (ví dụ: kiểm tra server)
        
        // Chuyển hướng sau khi đăng nhập thành công
        navigate('/dashboard')
      }
    


  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              placeholder="••••••••"
            />
          </div>
          <button onClick={handleLogin} type="submit">
            Đăng nhập
          </button>
        </form>
        <p className="register-text">
          Chưa có tài khoản? <a href="#">Đăng ký</a>
        </p>
      </div>
    </div>
  )
}


