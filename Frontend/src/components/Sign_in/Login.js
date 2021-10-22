import React,{useState, useEffect,} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Swal from 'sweetalert2';
import {useHistory,useParams} from "react-router-dom";


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn( props) {

  
let [email, setEmail] = useState("");
let [password, setPassword] = useState("");
let [userDetail, setLogin] = useState([]);
let [emailError, setEmailError] = useState({});
let [passwordError, setPasswordError] = useState({});




let history = useHistory();
const Redirect = (_id) => {
  history.push("/profile/"+`${_id}`);
};
const UserAuth = () => {
  //e.preventDefault();
  const isValid = validate();
    if (isValid) {
      fetch("http://localhost:8080/api/v1/banking/login", {
        method: "POST",
        body: JSON.stringify({  email, password}),
        headers: {"Content-Type": "application/json" },
      }).then((response) => response.json())
      .then((response) => {

        if(response.user==null){
          Swal.fire({ icon:'error',
          title: `${response.message}`, position: 'center', showConfirmButton:false,
          timer: 3000, width:350 })
          
        }
        else{
          Swal.fire({ icon:'success',
          title: `${response.message}`, position: 'center', showConfirmButton:false,
          timer: 3000, width:350, background:'white', iconColor:'green' })
        
          setLogin(response.user)
             //console.log("redux",response.user)
             Redirect(`${response.user._id}`)
           
              

        }

      })      
    }
};

const validate = () => {
 
  const emailError = {};
  const passwordError = {};
  

  let isvalid = true;


   if (email == 0) {
    emailError.emailV = "E-mail is Required";
    isvalid = false;
  } else if (password == 0) {
    passwordError.passwordV = "Password is Required";
    isvalid = false;
  }

 
  setEmailError(emailError);
  setPasswordError(passwordError);
 

  return isvalid;
};

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* <form className={classes.form} noValidate> */}
          <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            //id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          
          />
             {Object.keys(emailError).map((key) => {
            return <div style={{ color: "red" }}>{emailError[key]}</div>;
          })}
          <TextField
            variant="outlined"
            margin="normal"
            //required
            fullWidth
            name="password"
            label="Password"
            type="password"
           // id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
             {Object.keys(passwordError).map((key) => {
            return <div style={{ color: "red" }}>{passwordError[key]}</div>;
          })}
         
          <Button
            //type="Submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              UserAuth();
            }}
            
          >
            Sign In
          </Button>
         
          <Grid container>
           
            <Grid item xs>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
      
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}