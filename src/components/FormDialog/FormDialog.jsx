import {useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const FormDialog = ({
    title,
    helpText,
    inputLabel,
    inputPlaceHolder,
    show,
    onClose,
    onSave,
  }) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)

    const handleChange = (event) => {
      const {
        target: {
          value : inputVal
        }
      } = event

      if (inputVal) {
        setError(false)
      } else {
        setError(true)
      }
      setValue(inputVal)
    }


    const resetForm = () => {
      setValue('')
      setError(false)
    }

    const onFormClose = () => {
      resetForm()
      onClose()
    }

    const onFormSave = () => {
      if (value) {
        resetForm()
        onSave(value)
      }
    }

    return (
      <Dialog
          open={show}
          onClose={onFormClose}
        >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {helpText}
          </DialogContentText>
          <TextField
            label={inputLabel}
            variant="standard"
            value={value}
            error={error}
            onChange={handleChange}
            placeholder={inputPlaceHolder}
            sx={
              {
                width: '100%',
                mt: 1,
              }
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onFormClose}>Cancel</Button>
          <Button onClick={onFormSave}>Save</Button>
        </DialogActions>
      </Dialog>
    )
}

export default FormDialog

