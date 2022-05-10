import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Signup() {
    const [open, setOpen] = React.useState(false);
    const [status, setstatus] = useState("");
    const [message, setmessage] = useState("")
    const [user, setuser] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: ""
    })

    const [data, setdata] = useState("")
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = React.useState("");

    const [errors, seterrors] = useState({ email: "", password: "", firstName: '', lastName: '' });


    const handleSignup = async () => {

        let payload = user
        // console.log(payload);
        if (validate()) {
            await axios(`http://localhost:8080/sign-up`, {

                method: "POST",
                data: payload,

            })
                .then((res) => {
                    if (res.status) {
                        setdata(res.data)
                        // alert(res.data.message);
                        console.log(res);

                        setTimeout(() => {
                            navigate("/")

                        }, 2500);
                    }
                    setstatus("");
                    setmessage(res.data.message)
                })
                .catch((err) => {
                    console.log(data)
                    // alert(err.response.data.message);
                    // setErrorMessage(err.response.data.message)
                    setstatus("error");
                    setmessage(err.response.data.message)
                    // setOpen(true);
                })
        }
    }

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const validate = () => {
        console.log(user.email);
        let flag = false;
        if (user.firstname === '') {
            seterrors((prevState) => ({
                errors: { ...prevState.errors, firstName: "FirstName cannot be empty" },
            }));
            flag = true;
        } else {
            seterrors((prevState) => ({
                errors: { ...prevState.errors, firstName: "" },
            }));
        }
        if (user.lastname === '') {
            seterrors((prevState) => ({
                errors: { ...prevState.errors, lastName: "LastName cannot be empty" },
            }));
            flag = true;
        } else {
            seterrors((prevState) => ({
                errors: { ...prevState.errors, lastName: "" },
            }));
        }
        if (user.password === "") {
            // seterrors({...errors,password:'Password cannot be empty'})
            seterrors((prevState) => ({
                errors: { ...prevState.errors, password: "Password cannot be empty" },
            }));
            flag = true;
        } else if (
            /^(?=.*\d)(?=.*[a-z]).{6,20}$/.test(user.password) === false
        ) {
            // seterrors({...errors,password:'Invalid Password'})
            seterrors((prevState) => ({
                errors: { ...prevState.errors, password: "Invalid Password" },
            }));
            flag = true;
        } else {
            seterrors((prevState) => ({
                errors: { ...prevState.errors, password: "" },
            }));
        }
        if (user.email === "") {
            // seterrors({...errors,email:'Email cannot be empty'})
            seterrors((prevState) => ({
                ...prevState.errors,
                email: "Email cannot be empty",
            }));
            flag = true;
        } else if (
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email) ===
            false
        ) {
            // seterrors({...errors,email:'Invalid Email'})
            seterrors((prevState) => ({
                ...prevState.errors,
                email: "Invalid Email",
            }));
            flag = true;
        } else {
            seterrors((prevState) => ({ ...prevState.errors, email: "" }));
        }
        if (flag) {
            return false;
        } else {
            return true;
        }
    };
    return (

        <div>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose} severity={status === "error" ? "error" : "success"} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>

            <Container width="100vh" sx={{ textAlign: "center" }}>
                <Grid
                    container
                    xs={12}
                    component="main"
                    sx={{ width: "130vh", height: "80vh", marginLeft: "auto", marginBottom: "20px", marginRight: "auto", border: "1px solid black" }}
                >

                    <Grid item xs={12} >
                        <label style={{ fontSize: "40px", alignItems: "center" }} >AM Social Feed</label>
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "20px", marginLeft: "100px" }}>
                        <TextField
                            error={errors.firstName ? true : false}
                            type='text'
                            id="outlined-error"
                            label="First Name"
                            placeholder='Enter First Name'
                            value={user.firstname}
                            onChange={(e) => { setuser({ ...user, firstname: e.target.value }); setErrorMessage(""); }}
                            fullWidth
                            required
                            helperText={errors.firstName}
                        />
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "20px", marginLeft: "100px" }}>
                        <TextField
                            error={errors.lastName ? true : false}
                            type='text'
                            id="outlined-error"
                            label="Last Name"
                            placeholder='Enter Last name'
                            value={user.lastname}
                            onChange={(e) => { setuser({ ...user, lastname: e.target.value }); setErrorMessage(""); }}
                            fullWidth
                            required
                            helperText={errors.lastName}
                        />
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "20px", marginLeft: "100px" }}>
                        <TextField
                            error={errors.email ? true : false}
                            type='email'
                            id="outlined-error"
                            label="Email"
                            placeholder='Enter your email'
                            value={user.email}
                            onChange={(e) => { setuser({ ...user, email: e.target.value }); setErrorMessage(""); }}
                            fullWidth
                            required
                            helperText={errors.email}
                        />
                    </Grid>

                    <Grid item xs={9} style={{ paddingLeft: "0px", marginTop: "20px", marginLeft: "100px" }}>
                        <TextField
                            error={errors.password ? true : false}
                            size="small"
                            required
                            name="password"
                            placeholder="password"
                            type="password"
                            id="password"
                            value={user.password}
                            autoComplete="current-password"
                            onChange={(e) => { setuser({ ...user, password: e.target.value }); setErrorMessage(""); }}
                            helperText={errors.password}
                            autoFocus
                            sx={{ minWidth: "100%" }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{ marginTop: "30px" }}>
                        <Button type='submit' variant='contained' color='primary' sx={{ marginRight: "20px" }} onClick={() => { handleSignup(); handleClick() }} >Sign up</Button>

                        <Button type='submit' variant='contained' color='primary' onClick={() => navigate('/')}>Cancle</Button>
                    </Grid>

                    <Grid item xs={12} sm={12} sx={{ marginTop: "10px", }}>
                        <label style={{ marginLeft: "1%", marginBottom: "40px" }}> Already have account? <a href='' onClick={() => navigate('/')}>sign in</a></label>
                    </Grid>


                </Grid>

            </Container >
        </div>
    )
}

export default Signup