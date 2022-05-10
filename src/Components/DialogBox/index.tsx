import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { addItem, closeDialog, editItem, openDialog, removeItem, selectDialogOpen, selectEditData, selectSelectedItems } from '../../store/slices/tableSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';


export default function DialogBox() {
  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector(selectSelectedItems);
  const open = useAppSelector(selectDialogOpen);
  const editData = useAppSelector(selectEditData);

  const [nameTemp, setNameTemp] = useState(editData?.name || '');
  const [ageTemp, setAgeTemp] = useState(editData?.age || '');
  
  useEffect(() => {
    setNameTemp(editData?.name)
    setAgeTemp(editData?.age)
  }, [editData])
  


  const handleClickOpen = () => {
    dispatch(openDialog({}));
  };

  const handleClose = () => {
    dispatch(closeDialog({}));
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      age: { value: number };
    };

    if(editData?.name && editData?.age) {
      dispatch(editItem({
        ...editData,
        name: nameTemp,
        age: ageTemp
      }))
    } else {
      dispatch(addItem({
        name: nameTemp,
        age: ageTemp
      }))
    }
    setNameTemp('');
    setAgeTemp('');
    dispatch(closeDialog({}));
  }

  const handleDelete = () => {
    dispatch(removeItem({
      selectedItems
    }))
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>
      <Button disabled={selectedItems.length === 0} variant="outlined" onClick={handleDelete}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add</DialogTitle>
        <form id="myForm" onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            Please enter the details
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={nameTemp}
            onChange={(e) => setNameTemp(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="age"
            name="age"
            label="Age"
            type="number"
            fullWidth
            variant="standard"
            value={ageTemp}
            onChange={(e) => setAgeTemp(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="myForm">{editData?.name && editData?.age ? "Edit":  "Add"}</Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
