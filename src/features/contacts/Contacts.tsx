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
import Contact from "./Contact";
import { IContact } from "../../models/Contact";

function Contacts() {
  //React Hooks
  const [contactDescription, setContactDescription] = useState("");

  //React Redux Hooks
  const contactList = useSelector((state: RootState) => state.contacts);
  const dispatch = useDispatch<AppDispatch>();

  //Rendering
  return (
    <Container maxWidth="xs">
      <Typography style={{ textAlign: "center" }} variant="h3">
        Contact List
      </Typography>
      <TextField
        variant="outlined"
        label="add contact"
        fullWidth
        onChange={(e) => {setContactDescription(e.target.value)}}
        value={contactDescription}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={() => {
          if (contactDescription.trim() !== "") dispatch(addContact(contactDescription));
          setContactDescription("");
        }}
      >
        Add Contact
      </Button>
      <List>
        {contactList.map((contact: IContact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </List>
    </Container>
  );
}

export default Contacts;