import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
  },
  button: {
    height: "37px",
    marginTop: "17px",
    backgroundColor: "#3f51b5",
    "&:hover": {
      backgroundColor: "#3f51a0",
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default useStyles;
