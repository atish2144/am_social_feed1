import { Button, Card, CardContent, Container, FormControl, FormControlLabel, FormLabel, Grid, Input, Radio, RadioGroup, TextareaAutosize, TextField } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Header from './Header'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

function Edit() {
    // const [data, setdata] = useState(JSON.parse(localStorage.getItem("data")));
    const [data, setdata] = useState({
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
    const [lcdata, setlcdata] = useState(JSON.parse(localStorage.getItem("data")));
    // console.log(lcdata);
    const [payload, setpayload] = useState("")
    const [file, setFile] = useState("https://gogetfunding.com/wp-content/uploads/2020/06/6707938/img/mimg_6707938_1592357701.png");
    // const [user, setUser] = useState(
    //     {
    //         "firstname": data.firstname || "",
    //         "lastname": data.lastname || "",
    //         "biodata": data.bio || "",
    //         "gender": data.gender || "",
    //         "dateofbirth": data.dateofbirth || "",
    //         "mobile": data.mobile || "",
    //         "email": data.email || ""
    //     }
    // )
    const navigate = useNavigate()
    const id = lcdata.currentUser._id;
    // console.log(data.token);
    // let payload;

    const handleUpdate = async () => {

        let formData = new FormData()
        formData.append('image', image);
        console.log("data", payload);

        // console.log("1", payload);
        // console.log(id);
        await axios(`http://localhost:8080/edit-profile/${id}`, {
            method: "PUT",
            data: payload,
            headers: {
                "auth-token": lcdata.token,
            },

        })

            .then((res) => {
                // if (res.status) {
                alert(res.data.message);
                navigate('/')
                // }
            })
            .catch((err) => {
                // console.log(data)
                alert(err.response.data.message);
                console.log("hi");
            })
        // console.log(user);
    }
    // console.log(data);

    function handleChange(e) {
        setimage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    useEffect(() => {
        console.log(data);
        setpayload(data)
    }, [data])

    useEffect(() => {
        axios(`http://localhost:8080/profile/${id}`, {
            method: "GET",
        })
            .then((res) => {
                // console.log(res.data.users);
                if (res.data.users != "") {
                    setdata({
                        firstname: res.data.users.firstname || "",
                        lastname: res.data.users.lastname || "",
                        biodata: res.data.users.biodata || "",
                        gender: res.data.users.gender || "",
                        dateofbirth: res.data.users.dateofbirth || "",
                        mobile: res.data.users.mobile || "",
                        email: res.data.users.email || "",
                    })
                }
            })
            .catch((err) => {
                console.log("hi");
            })
    }, [])
    console.log("1", data);
    return (
        <div>
            <Header></Header>
            <Card sx={{ minWidth: 450, maxWidth: 700, margin: '0 auto', marginTop: "50px" }}>
                <CardContent>
                    <Grid container spacing={1}>


                        <Grid item xs={4}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",

                            }}
                        >
                            <img src={file} alt="log" style={{ width: "60%", height: "60%" }} />
                        </Grid>
                        <Grid item sx={{ marginTop: "10px" }}>
                            <FormControl>
                                {/* <FormLabel>Change Profile Picture</FormLabel> */}
                                <Input type="file" label="Upload Profile Picture" onChange={handleChange} />
                            </FormControl>
                        </Grid>






                        <Grid item xs={12} sm={12}>
                            <TextField
                                error={false}
                                type='text'
                                id="outlined-error"
                                // label=" FirstName"
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
                            <TextField
                                id="date"
                                label="Date of Birth"
                                type="date"
                                // defaultValue="1999-04-16"
                                // sx={{ width: 220 }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => setdata({ ...data, dateofbirth: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>


                        <Grid item xs={12} sm={12}>
                            <TextField
                                error={false}
                                type='number'
                                id="outlined-error"
                                label="Mobile"
                                placeholder='mobile'
                                value={data.mobile}
                                onChange={(e) => setdata({ ...data, mobile: e.target.value })}
                                fullWidth
                                required
                            />
                        </Grid>




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


                        <Grid item xs={12} sm={6}>
                            <Button type='submit' variant='contained' color='primary' sx={{ float: "right", marginTop: "20px" }} onClick={() => handleUpdate()}>Update</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* </Container> */}

        </div>
    )
}

export default Edit