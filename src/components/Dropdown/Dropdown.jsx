import AutoComplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField';

const DropDown = ({
    label,
    value,
    options,
    onSelect,
    style
  }) => {
    return (
      <AutoComplete
        options={options}
        sx={style}
        value={value}
        onChange={(event, newValue) => onSelect(newValue)}
        renderInput={(params) => <TextField label={label} {...params} />}
      />
    )
}

export default DropDown
