import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#87CEFA"
  },
  row: {
    marginBottom: "5px",
  },
  button: {
    margin: "17px 0 10px",
    backgroundColor: "#3f51b5",
    "&:hover": {
      backgroundColor: "#3f51a0",
    },
  },
});

export default useStyles;
