import React from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
function LandingPage() {
    const navigate = useNavigate();

    return (
        <div style={{
             display: 'flex', justifyContent: 'center', alignItems: 'center',
             width: '100%', height: '100vh'}}>
            <h2>시작 페이지</h2>

            <button onClick={() => axios.get(`/api/users/logout`)
                                    .then(res => {
                                        if (res.data.success) {
                                            navigate('/login');
                                        } else {
                                            alert('로그아웃 하는데 실패 하였습니다.');
                                        }
                                    })}>
                logout
            </button>
        </div>
    )
}

export default LandingPage