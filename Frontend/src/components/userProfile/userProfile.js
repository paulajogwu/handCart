import React, {useState, useEffect} from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";

import TableCell from "@material-ui/core/TableCell";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Container from "@material-ui/core/Container";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {useHistory,useParams,Link} from "react-router-dom";


const useStyle = makeStyles({
  root: {
    flex: 1,
    minWidth: 100,
    borderColor: "blue",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
export default function ButtonAppBar() {
  const classes = useStyles();
  const classe = useStyle();

  let [users, setUserlist] = useState([]);


  let {_id} = useParams();
  const Customers = () => {
    fetch("http://localhost:8080/api/v1/banking/get_user/"+`${_id}`)
      .then((response) => response.json())
      .then((response) => console.log( "we go" , setUserlist(response)));
  };

  useEffect(() => {
    Customers();
  }, []);

  
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit"><Link to="/" style={{color:'white'}}>Sign-Out</Link></Button>
        </Toolbar>
      </AppBar>
      <br />
    
        <Typography
          style={{
            textAlign: "center",
            // paddingTop: "9%",
            fontWeight: "bold",
            color: "blue",
            fontSize: 28,
          }}
          color="textSecondary"
          gutterBottom
        >
          USER PROFILE
        </Typography>

        <>
          <Container component="main">
            <CssBaseline />
            <Grid
              container
            
           
            >
              <Grid item xs={6} style={{  margin: "auto" }}>
                <Card className={classe.root} variant="outlined">
                  <CardContent>
                  

                    
                    <Paper
                      elevation={2}
                      style={{ height: 350 , width: "100%",margin: "auto", alignContent:'center' }}
                    >
                      <div >
                        <img src="/user80px.png"  height="20%" width="20%" alt="" style={{  marginLeft:"35%" }} />
                      </div>
                      <hr/>
                      <Grid
                        container
                        spacing={3}
                        style={{ width: "100%" }}
                      >
                        <Grid item xs={6}>
                          <Typography style={{ fontSize: 18, fontWeight:'bolder', textAlign:'center'}}>First Name :</Typography>
                          <br/>
                          <Typography style={{ fontSize: 18, fontWeight:'bolder', textAlign:'center'}}>Last Name :</Typography>
                          <br/> 
                          <Typography style={{ fontSize: 18, fontWeight:'bolder' , textAlign:'center'}}>E-mail :</Typography>
                          <br/>
                          <Typography style={{ fontSize: 18, fontWeight:'bolder' , textAlign:'center'}}>Mobile :</Typography>
                        </Grid>
                        {users.map((data) => (
                        <Grid item xs={6}>
                       
                          <Typography>{data.firstname} </Typography>
                          <br/>
                          <Typography>{data.lastname}</Typography>
                          <br/>
                          <Typography>{data.email}</Typography>
                          <br/>
                          <Typography>{data.phone}</Typography>
                      
                        </Grid>
                          ))}
                      </Grid>
                    </Paper>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </>
      
    </div>
  );
}
