import React from 'react';
import './login-page.css';

function LoginPage() {
  return (
    <div className='formContainer'>
      <form>
        {/* <img src='kaizntree.png' /> */}
        <br />
        <input placeholder='username' required />
        <br />
        <input placeholder='password' required />
        <br />
        <div class='buttons'>
          <button>Create Account</button>
          <button>Login</button>
        </div>
        <br />
        <a class='passwordReset'>Forgot Password</a>
      </form>
    </div>
  );
}

export default LoginPage;
