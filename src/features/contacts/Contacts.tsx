// React App
import { useState } from "react";
// Material-UI Imports
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
// Other Imports
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addContact } from "../../redux/contactSlice";
import Contact from "./contact/Contact";
import { HandlerProps, IContact } from "../../models/Contact";
import useStyles from "./ContactsStyling";
import { Divider } from "@material-ui/core";

function Contacts() {
  const classes = useStyles();

  //React Hooks
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  //React Redux Hooks
  const contactList: IContact[] = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();

  //
  const onClickHandler = () => {
    if (name.trim() !== "" && phone.trim() !== "") {
      dispatch(addContact({ name, phone } as HandlerProps))
    };
    setName("");
    setPhone("");
  }
  //Rendering
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center" }} variant="h3">
        Contact List
      </Typography>
      <TextField
        className={classes.row}
        variant="outlined"
        label="Name"
        fullWidth
        onChange={(e) => { setName(e.target.value) }}
        value={name}
      />
      <TextField
        variant="outlined"
        label="Phone"
        fullWidth
        onChange={(e) => { setPhone(e.target.value) }}
        value={phone}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        fullWidth
        onClick={onClickHandler}
      >
        Add Contact
      </Button>
      <Divider />
      <List>
        {contactList.map((contact: IContact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </List>
    </Container>
  );
}

export default Contacts;