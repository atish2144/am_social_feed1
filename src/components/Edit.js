import { Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
// import Header from './Header'
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MuiPhoneNumber from 'material-ui-phone-number';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});





function Edit() {
    const lcdata = JSON.parse(localStorage.getItem("data"))
    const id = lcdata && lcdata.currentUser._id;
    console.log(id);

    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate()
    const [data, setdata] = useState({
        "img": "",
        "firstname": "",
        "lastname": "",
        "biodata": "",
        "gender": "",
        "dateofbirth": "",
        "mobile": "",
        "email": ""
    }
    );

    const [image, setimage] = useState("")
    const [file, setFile] = useState();

    const [updateProfile, setUpdateProfile] = useState(false)


    //snackbar
    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    const handleUpdate = async () => {

        let formData = new FormData()
        formData.append('image', image);
        formData.append('firstname', data.firstname);
        formData.append('biodata', data.biodata);
        formData.append('gender', data.gender);
        formData.append('dateofbirth', data.dateofbirth);
        formData.append('mobile', data.mobile);
        formData.append('email', data.email);

        await axios(`http://localhost:8080/edit-profile/${id}`, {
            method: "PUT",
            data: formData,
            headers: {
                "auth-token": lcdata.token,
            },

        })

            .then((res) => {
                // alert(res.data.message);
                handleClick();
                console.log(res);
                setTimeout(() => {
                    navigate('/Feed')

                }, 1500);

            })
            .catch((err) => {
                console.log(err)
                alert(err.response.data.message);
                console.log("hi");
            })

    }


    function handleChange(e) {
        setimage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
        setUpdateProfile(true)
    }

    useEffect(() => {

        axios(`http://localhost:8080/profile/${id}`, {
            method: "GET",
        })
            .then((res) => {
                console.log(res.data.users.img);
                if (res.data.users != "") {

                    setdata({
                        img: res.data.users.img || file,
                        firstname: res.data.users.firstname || "",
                        lastname: res.data.users.lastname || "",
                        biodata: res.data.users.biodata || "",
                        gender: res.data.users.gender || "",
                        dateofbirth: res.data.users.dateofbirth || "",
                        mobile: res.data.users.mobile || " ",
                        email: res.data.users.email || "",
                    })
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    console.log(data);

    return (
        <div>
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                    User Updated
                </Alert>
            </Snackbar>


            {/* <Header></Header> */}
            <Card sx={{ minWidth: 450, maxWidth: 700, margin: '0 auto', marginTop: "50px" }}>
                <CardContent>
                    <Grid container spacing={1}>

                        <Grid item
                            xs={4}
                            sx={{
                                display: "flex", justifyContent: "center",
                                alignItems: "center",
                                // width: "70%",
                                // height: "90%"       border: "1px solid grey",

                            }}
                        >
                            <img src={updateProfile ? file : `http://localhost:8080/${data.img}`} alt="log" style={{
                                width: "70%",
                                height: "90%",
                            }}
                            />
                        </Grid>


                        <Grid item sx={{ marginTop: "10px" }}>
                            <FormControl>

                                <FormLabel>Change Profile Picture</FormLabel>
                                <Input type="file" label="Upload Profile Picture" onChange={handleChange} />
                            </FormControl>

                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <TextField
                                error={false}
                                type='text'
                                id="outlined-error"

                                placeholder='Enter first name'
                                value={data.firstname}
                                //   defaultValue={lcdata.currentUser.firstname}

                                onChange={(e) => setdata({ ...data, firstname: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextField
                                error={false}
                                type='text'
                                id="outlined-error"
                                // label="Last  Name"
                                placeholder='Enter last name'
                                // defaultValue={data.lastname}
                                value={data.lastname}
                                onChange={(e) => setdata({ ...data, lastname: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>


                        {/* //Bio */}
                        <Grid item xs={12} sm={12}>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={5}
                                placeholder="Bio"
                                style={{ width: 665 }}
                                value={data.biodata}
                                onChange={(e) => setdata({ ...data, biodata: e.target.value })}
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={data.gender}
                                    // onChange={(e) => setEmployee({ ...employee, gender: e.target.value })}
                                    onChange={(e) => setdata({ ...data, gender: e.target.value })}
                                >
                                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>


                        <Grid item xs={12} sm={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                {/* <FormControl> */}
                                {/* <FormLabel>DOB</FormLabel> */}
                                <TextField
                                    id="date"
                                    type="date"
                                    value={data.dateofbirth}
                                    onChange={(value) =>
                                        setdata({
                                            ...data,
                                            dateofbirth: value.target.value,
                                        })
                                    }
                                    fullWidth
                                    required
                                />
                                {/* </FormControl> */}
                            </MuiPickersUtilsProvider>
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <TextField
                                error={false}
                                type='number'
                                id="outlined-error"
                                // label="Last  Name"
                                placeholder='Enter Mobile Number'
                                // defaultValue={data.lastname}
                                value={data.mobile}
                                onChange={(e) => setdata({ ...data, mobile: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>


                        {/* <Grid item xs={12} sm={12}>
                            <MuiPhoneNumber defaultCountry={'in'}
                                placeholder='mobile'
                                value={data.mobile}
                                onChange={(e) => setdata({ ...data, mobile: e.target.value })}
                                fullWidth
                                required
                            />

                        </Grid> */}

                        <Grid item xs={12} sm={12}>
                            <TextField
                                error={false}
                                type='text'
                                id="outlined-error"
                                // label="Email"
                                placeholder='Enter Email'
                                value={data.email}
                                onChange={(e) => setdata({ ...data, email: e.target.value })}
                                fullWidth
                                required
                                sx={{ marginBottom: "20px" }}
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <Button type='submit' variant='contained' color='primary' sx={{ float: "left", marginTop: "20px" }} onClick={() => handleUpdate()}>Update</Button>
                            <Button type='submit' variant='contained' color='primary' sx={{ float: "center", marginTop: "20px" }} onClick={() => navigate('/Feed')}>Cancle</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>


        </div>
    )
}

export default Edit