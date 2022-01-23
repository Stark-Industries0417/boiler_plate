import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import{loginUser} from '../../../_actions/user_action';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from '@fortawesome/free-solid-svg-icons';
import {
    Button,
    Box,
    TextField,
    Container,
    Grid,
    Typography,
 } from '@mui/material/';




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
            <Container sx={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Grid container sx={{
                    justifyContent: 'center',
                }}>
                    <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                    >
                        <Grid item>
                            <Typography variant='h5' sx={{textAlign: 'center', fontWeight: 'bold', mb: 2}}>
                                로그인
                            </Typography>
                        </Grid>
                        <Grid item>
                            <TextField
                                required
                                id="outlined-required"
                                autoComplete='email'
                                placeholder='아이디를 입력해 주세요.'
                                name='email'
                                style={{width: 325, marginBottom: 2}}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="outlined-password-input"
                                type="password"
                                autoComplete="current-password"
                                placeholder='비밀번호를 입력해 주세요.'
                                name='password'
                                style={{width: 325}}
                            />
                        </Grid>
                        <Grid item>
                            <Button 
                                variant='contained'
                                style={{
                                    width: 325,
                                    padding: 14,
                                    marginLeft: 7,
                                    backgroundColor: 'purple',
                                    fontSize: 18,
                                }}>로그인</Button>
                        </Grid>
                        <Grid>
                            <Button
                                variant='outlined'
                                style={{
                                    width: 325,
                                    padding: 13,
                                    marginLeft: 7,
                                    color: 'purple',
                                    backgroundColor: 'white',
                                    fontSize: 18,
                                    borderColor: 'purple',
                                    marginTop: 10,
                                }}>회원가입</Button>
                        </Grid>
                        <Grid>
                            <Button
                                variant='container'
                                style={{
                                    width: 325,
                                    padding: 13,
                                    marginLeft: 7,
                                    color: 'black',
                                    backgroundColor: 'yellow',
                                    fontSize: 18,
                                    marginTop: 10,
                                }}>
                                <FontAwesomeIcon icon={faComment} style={{marginRight: 18}}/>
                                    카카오 계정으로 로그인</Button>
                        </Grid>
                    </Box>
                </Grid>
            </Container>

    )
}


{/* <div style={{
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
        </div> */}

export default LoginPage