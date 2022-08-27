import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        
        alignItems: "center",
    },
    content: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "30%"
    },
    button: {
        backgroundColor: "#3f51b5",
        '&:hover': {
            backgroundColor: "#3f51a0"
        }
    }
});

export default useStyles;
