import  ListItem  from '@material-ui/core/ListItem';
import { Checkbox, IconButton, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import DeleteIcon  from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { removeContact, setContactStatus } from '../../redux/contactSlice';
import { IContact } from '../../models/Contact';

export default function Contact({contact}:{contact: IContact}) {
    const dispatch = useDispatch<AppDispatch>();

  return (
    <ListItem>
        <ListItemText
            style={{
            textDecoration: contact.completed ? "line-through" : "none",
            }}
        >
            {contact.description}
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
