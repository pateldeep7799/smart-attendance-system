import React from "react";
import { styled } from "@material-ui/styles";
import Button from "@material-ui/core/Button";



import CircularProgress from "@material-ui/core/CircularProgress";

const StyledButton = styled(Button)({
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px"
});

export default function StyledComponents(props) {
  
  const { classes, loading, ...other } = props;

  
  if (loading) {
    return (
      <StyledButton {...other}>
        <CircularProgress />
      </StyledButton>
    );
  }else{
    return (
      <StyledButton {...other}/>
    );
  } 
  
  // return (
  //   <StyledButton {...props}>
  //     <CircularProgress />
  //   </StyledButton>
  // );

  // if (done) {
  //   return (
  //     <StyledButton {...other}/>
  //   );
  // }
  // else 
}
