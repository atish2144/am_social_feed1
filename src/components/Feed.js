import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Header from "./Header"
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import { Button, FormControl, FormLabel, Grid, Input, TextareaAutosize } from '@mui/material';
import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import axios from 'axios';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Feed() {

    //for snackbar
    const [open1, setOpen1] = React.useState(false);


    const [expanded, setExpanded] = React.useState(false);
    const [data, setdata] = useState(JSON.parse(localStorage.getItem("data")));
    const [colorlike, setcolorlike] = React.useState(false);

    //for modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    //for file
    console.log(data);

    const [file, setFile] = useState(" ");
    const [post, setpost] = useState([]);
    const [caption, setcaption] = useState("");
    const [image, setimage] = useState("")

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    function handleChange(e) {
        setimage(e.target.files[0])
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    //for snackbar
    const handleClick = () => {
        setOpen1(true);
        console.log("snackbar")
    };

    const handleClose1 = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen1(false);
    };

    //for add post 
    const [count, setcount] = useState(0)

    const handlepost = async () => {

        let formData = new FormData()
        formData.append('image', image);
        formData.append('caption', caption);

        axios(`http://localhost:8080/post `, {
            method: "POST",
            data: formData,
            headers: {
                "auth-token": data.token
            },
        })
            .then((res) => {
                console.log(res);
                handleClick();

            })
            .catch((err) => {

            })
        setcount(prev => prev + 1)

    }

    const LikeHandler = (id) => {
        axios(`http://localhost:8080/like/${id}`, {
            method: "PUT",
            data: (data._id),
            headers: {
                "auth-token": data.token
            },
        })
            .then((res) => {
                // console.log(res.data.post);
                setpost(res.data.post)
            })
            .catch((err) => { console.log(err) })
    }


    // use effect

    useEffect(() => {

        axios(`http://localhost:8080/?page=1&limit=3000`, {
            method: "GET",
            headers: {
                "auth-token": data.token
            },
        })
            .then((res) => {
                setpost(res.data.post)
                console.log("hi");
                console.log(res.data.post);

            })
            .catch((err) => {
                // console.log(data)
                // alert(err.response.data.message);
                // console.log("hi");

            })
    }, [count])



    return (
        // #518CDB
        <div>
            <div style={{ backgroundColor: "white" }}>
                <Header></Header>
                {/* <button style={{float:"right",margin:"5px 10px 0 0" ,color:"primary"}}>Add Post</button>     */}


                {/* snackbar     */}

                <Button type='submit' variant='contained' color='primary' sx={{ float: "right", margin: "5px 5px 0 0" }} onClick={handleOpen} >Add Post</Button>

                {
                    post.length > 0 && post.map((posts, index) => {
                        // console.log(posts)
                        return (
                            <div style={{ marginTop: "20px" }}>
                                <Card key={index} sx={{ maxWidth: 400, marginLeft: "35%", border: "0.25px solid black" }}  >
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                                A
                                            </Avatar>
                                        }
                                    // action={
                                    //     <IconButton aria-label="settings">
                                    //         <MoreVertIcon />
                                    //     </IconButton>
                                    // }
                                    // title="Shrimp and Chorizo Paella"
                                    // subheader="September 14, 2016"
                                    />
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        width="200"
                                        image={`http://localhost:8080/${posts.img}`}
                                        alt="Paella dish1"
                                    />
                                    <CardContent>
                                        <Typography style={{ textAlign: "left", fontSize: "20px" }}>
                                            {posts.caption}
                                        </Typography>
                                    </CardContent>



                                    {/* { */}

                                    <CardActions disableSpacing>
                                        <Typography >
                                            <IconButton aria-label="add to favorites">

                                                <FavoriteIcon onClick={(e) => { setcolorlike(!colorlike); LikeHandler(posts._id) }}
                                                    style={{ color: (colorlike) ? "red" : "grey" }} />

                                            </IconButton>
                                            {posts.like.length}
                                        </Typography>
                                        <Typography>
                                            <IconButton aria-label="add to favorites">
                                                <CommentIcon style={{ marginLeft: "9" }}
                                                    expand={expanded}
                                                    onClick={handleExpandClick}
                                                    aria-expanded={expanded}
                                                    aria-label="show more"
                                                />
                                            </IconButton>
                                            {posts.comment.length}
                                        </Typography>

                                    </CardActions>

                                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                                        <Typography ></Typography>
                                        <CardContent>
                                            <Typography >
                                                <TextField style={{ width: "335px" }} label="Comments" variant="standard"
                                                />
                                                <SendIcon />
                                            </Typography>
                                            <Typography style={{ textAlign: "left", marginTop: "8px" }}>
                                                <Avatar>
                                                    X
                                                </Avatar>
                                                aside for 10 minutes.
                                            </Typography>
                                        </CardContent>
                                    </Collapse>

                                </Card>
                            </div>
                        )
                    }
                    )
                }





                {/* modal */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"


                >
                    <Box sx={style}>

                        <Grid item xs={6}
                            sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                border: "1px solid grey"
                            }}
                        >
                            <img src={file} alt="log" style={{ width: "50%", height: "50%" }} />
                        </Grid>

                        <Grid item sx={{ marginTop: "10px" }}>
                            <FormControl>
                                {/* <FormLabel>Change Profile Picture</FormLabel> */}
                                <Input type="file" label="Upload Profile Picture" onChange={handleChange} />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={12}>
                            <TextareaAutosize
                                aria-label="minimum height"
                                minRows={5}
                                placeholder="Add Caption"
                                style={{ width: "400px ", marginTop: "5px" }}
                                value={caption}
                                onChange={(e) => setcaption(e.target.value)}
                            />
                        </Grid>

                        <Button type='submit' variant='contained' color='primary' sx={{ float: "right", margin: "5px 5px 0 0" }} onClick={() => { handlepost(); handleClose() }} >Add Post</Button>
                    </Box>
                </Modal>
            </div >
            <Snackbar open={open1} autoHideDuration={800} onClose={handleClose1}>
                <Alert onClose={handleClose1} severity="success" sx={{ width: "100%" }}>
                    Post Added Succesfully
                </Alert>
            </Snackbar>

        </div>
    )
}

export default Feed