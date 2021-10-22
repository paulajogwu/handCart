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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignUp() {
  const classes = useStyles();


  let [firstName, setFirstname] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [phone, setPhone] = useState("");
  let [password, setPassword] = useState("");

 
let [profile, setUserAccount] = useState([]);

  let [firstnameError, setFirstnameError] = useState({});
  let [lastnameError, setLastnameError] = useState({});
  let [emailError, setEmailError] = useState({});
  let [phoneError, setPhoneError] = useState({});
  let [passwordError, setPasswordError] = useState({});

 

  let history = useHistory();
  const Redirect = (_id) => {
    history.push("/profile/"+`${_id}`);
  };

  const submit = () => {
    ///e.preventDefault(); 
    const isValid = validate();
    if (isValid) {
      fetch("http://localhost:8080/api/v1/banking/create_user", {
        method: "POST",
        body: JSON.stringify({ firstName,lastName, email,phone, password}),
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json())
      .then((response) => {
        if(response.user == null  ){
          Swal.fire({ icon:'error',
          title: `${response.message}`, position: 'center', showConfirmButton:false,
          timer: 3000, width:350 })
          
        }
        else{
          Swal.fire({ icon:'success',
          title: `${response.message}`, position: 'center', showConfirmButton:false,
          timer: 3000, width:350, background:'white', iconColor:'green' })
        
          setUserAccount(response.user)
         
        
              Redirect(`${response.user._id}`)

        }
   
    })
    // .catch((err) => {
    //     Swal.fire('an error occured pls try again later ');
    //     console.log();
    // })

    }
  };


  const validate = () => {
    const firstnameError = {};
    const lastnameError = {};
    const emailError = {};
    const phoneError ={}
    const passwordError = {};
    

    let isvalid = true;

    if (firstName == 0) {
      firstnameError.firstnameV = "First Name is Required";
      isvalid = false;
    } else if (lastName == 0) {
      lastnameError.lastnameV = "Last Name is Required";
      isvalid = false;
    }
     else if (email == 0) {
      emailError.emailV = "E-mail is Required";
      isvalid = false;
    } 
    else if (phone == 0) {
      phoneError.phoneV = "phone is Required";
      isvalid = false;
    } 
    // else if (phone < 11) {
    //   phoneError.phonet = "phone is too short";
    //   isvalid = false;
    // }
    // else if (phone > 11) {
    //   phoneError.phonec = "phone is too Long";
    //   isvalid = false;
    // }
    else if (password == 0) {
      passwordError.passwordV = "Password is Required";
      isvalid = false;
    }

    setFirstnameError(firstnameError);
    setLastnameError(lastnameError);
    setEmailError(emailError);
    setPhoneError(phoneError)
    setPasswordError(passwordError);
   

    return isvalid;
  };


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
   
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
     <br/>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => setFirstname(e.target.value)}
              />
               {Object.keys(firstnameError).map((key) => {
            return <div style={{ color: "red" }}>{firstnameError[key]}</div>;
          })}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setLastName(e.target.value)}
              />
             
               {Object.keys(lastnameError).map((key) => {
            return <div style={{ color: "red" }}>{lastnameError[key]}</div>;
          })}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
              />
               {Object.keys(emailError).map((key) => {
            return <div style={{ color: "red" }}>{emailError[key]}</div>;
          })}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="Phone"
                label="Phone"
                type="mobile"
                id="Phone"
                autoComplete="mobile"
                onChange={(e) => setPhone(e.target.value)}
              />
               {Object.keys(phoneError).map((key) => {
            return <div style={{ color: "red" }}>{phoneError[key]}</div>;
          })}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
               {Object.keys(passwordError).map((key) => {
            return <div style={{ color: "red" }}>{passwordError[key]}</div>;
          })}
            </Grid>
          
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              submit();
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        {/* </form> */}
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}