import React, { useState } from 'react';
import {registerUser} from '../../../_actions/user_action'
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';


function RegisterPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");


    const onSubmitHandler = e => {
        e.preventDefault();

        if(password !== passwordCheck) {
          return alert('비밀번호가 일치하지 않습니다.');
        }

        let body = {
            email,
            name,
            password,
            passwordCheck,
        }
        dispatch(registerUser(body))
            .then(res => {
                if(res.payload.success) {
                    navigate("/login");
                } else {
                    alert('Failed to sign up');
                }
            })
       }
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
  }}>
      <form style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}>

          <label>Email</label>
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          
          <label>Name</label>
          <input type='text' value={name} onChange={e => setName(e.target.value)} />

          <label>Password</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />

          <label>Comfirm Password</label>
          <input type='password' value={passwordCheck} onChange={e => setPasswordCheck(e.target.value)} />
          <br />
          <button>
              회원가입
          </button>
      </form>
  </div>
  )
}

export default RegisterPage;
