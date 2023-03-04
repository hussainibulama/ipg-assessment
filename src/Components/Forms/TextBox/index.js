import {styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const CustomTextField = styled(TextField)({
  '& MuiFormHelperText-root': {
    fontFamily: 'inherit',
  },
  '& label.Mui-focused': {
    color: 'black',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    height: '50px',
    fontFamily: 'inherit',
    '& fieldset': {
      borderColor: '#E6EAEE',
      borderRadius: '16px',
    },
    '&:hover fieldset': {
      borderColor: '#10AC84',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#10AC84',
    },
  },
});
const TextInput = ({
  label,
  type,
  value,
  error,
  errorText,
  onChange,
  name,
  testid,
  params,
}) => {
  return (
    <>
      <CustomTextField
        {...params}
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        type={type}
        data-testid={testid}
        error={error}
        name={name}
        id={name}
        key={name}
        helperText={error ? errorText : ''}
      />
    </>
  );
};
export default TextInput;
