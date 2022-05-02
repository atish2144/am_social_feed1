import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
// import GoogleIcon from '@mui/icons-material/Google';
// import { GoogleLogin } from 'react-google-login';
function Login() {
    const [user, setuser] = useState({
        email: "",
        password: ""
    })

    const [data, setdata] = useState("")
    const [lcdata, setlcdata] = useState(JSON.parse(localStorage.getItem("data")))

    const navigate = useNavigate();

    // useEffect(() => {
    //     console.log(lcdata);
    //     if (lcdata.token != null && lcdata.token) {
    //         console.log(lcdata.token);
    //         // navigate('/Feed')
    //     }

    // }, [data])




    const handleLogin = async () => {
        let payload = user

        await axios(`http://localhost:8080/login`, {
            method: "POST",
            data: payload,
            //   headers: {
            //     Authorization: token.token,
            //     "Content-Type": "application/json",
            //   },
        })
            .then((res) => {
                if (res.status) {
                    setdata(res.data)
                    alert(res.data.message);
                    // console.log(res);
                    localStorage.setItem("data", JSON.stringify(res.data))
                    navigate('/Feed')
                }
            })
            .catch((err) => {
                // console.log(data)
                alert(err.response.data.message);

            })
    }

    // console.log(data);
    return (
        <div>
            <Container width="100vh" sx={{ textAlign: "center" }}>

                <Grid
                    container
                    xs={12}
                    component="main"
                    sx={{ width: "70vh", marginLeft: "auto", marginRight: "auto", border: "1px solid black" }}
                >

                    <Grid item xs={12} style={{ marginBottom: "50px" }} >
                        <label style={{ fontSize: "40px", alignItems: "center" }} >Login</label>
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "0px", marginLeft: "60px" }}>
                        <TextField
                            error={false}
                            type='text'
                            id="outlined-error"
                            label="Email"
                            placeholder='Enter Email'
                            value={user.email}
                            onChange={(e) => setuser({ ...user, email: e.target.value })}
                            fullWidth
                            required
                            sx={{ marginBottom: "20px" }}

                        />
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "0px", marginLeft: "60px" }}>
                        <TextField
                            error={false}
                            type='password'
                            id="outlined-error"
                            label="Password"
                            placeholder='Enter Password'
                            value={user.password}
                            onChange={(e) => setuser({ ...user, password: e.target.value })}
                            fullWidth
                            required
                            sx={{ marginBottom: "20px" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={12} sx={{ marginTop: "30px" }}>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: "auto", marginRight: "auto" }} onClick={() => { handleLogin() }} >Login </Button>
                    </Grid>
                    {/* <Grid item xs={12} style={{ marginBottom: "50px" }} >
                        <label style={{ fontSize: "20px", alignItems: "center" }} >Does not have a account</label>
                    </Grid> */}
                    <Grid item xs={12} sm={12} sx={{ marginTop: "30px" }}>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginLeft: "auto", marginRight: "auto", marginBottom: "10px" }} onClick={() => navigate('/signup')} >Sign up </Button>
                    </Grid>

                    {/* <button style={{ fontSize: "20px", marginBottom: "30px", marginLeft: "auto", marginRight: "auto" }}> <GoogleIcon /> Login with Google</button> */}
                    <Grid item xs={12} sm={12} sx={{ marginTop: "10px", marginBottom: "20px" }}>
                        {/* <GoogleLogin
                            clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            // onSuccess={responseGoogle}
                            //  onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            style={{ marginBottom: "30px", marginLeft: "auto", marginRight: "auto" }}
                        />, */}
                    </Grid>

                </Grid>

            </Container>

        </div>
    )
}

export default Login