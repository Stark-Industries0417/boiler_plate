import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import{loginUser} from '../../../_actions/user_action';
import {useNavigate} from 'react-router-dom';


function LoginPage(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmitHandler = e => {
        e.preventDefault();

        let body = {
            email,
            password
        }
        dispatch(loginUser(body))
            .then(res => {
                if(res.payload.loginSuccess) {
                    navigate("/");
                } else {
                    alert('Error');
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
                <label>Password</label>
                <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                <br />
                <button>
                    Login
                </button>
            </form>
        </div>
    )
}

export default LoginPage