import ListItem from '@material-ui/core/ListItem';
import { Checkbox, IconButton, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { removeContact, setContactStatus } from '../../../redux/contactSlice';
import { IContact } from '../../../models/Contact';
import useStyles from "./ContactStyling";

export default function Contact({ contact }: { contact: IContact }) {
    const dispatch = useDispatch<AppDispatch>();
    const classes = useStyles();
    return (
        <ListItem className={classes.root} alignItems={'flex-start'}>
            <ListItemText
                style={{
                    textDecoration: contact.completed ? "line-through" : "none",
                }}
            >
                {contact.name}
            </ListItemText>
            <ListItemText
                style={{
                    textDecoration: contact.completed ? "line-through" : "none",
                }}
            >
                {contact.phone}
            </ListItemText>
            <ListItemSecondaryAction>
                <IconButton
                    onClick={() => {
                        dispatch(removeContact(contact.id));
                    }}
                >
                    <DeleteIcon />
                </IconButton>
                <Checkbox
                    edge="end"
                    value={contact.completed}
                    onChange={() => {
                        dispatch(
                            setContactStatus({ completed: !contact.completed, id: contact.id })
                        );
                    }}
                />
            </ListItemSecondaryAction>
        </ListItem>
    )
}
