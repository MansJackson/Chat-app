import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  NicknameForm: {
    '& > *': {
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
  disconnect_btn: {
    position: 'fixed',
    bottom: '5rem',
    right: '1rem',
  },
  sent_message: {
    backgroundColor: '#cfe8ff !important',
  },
  recieved_message: {
    backgroundColor: '#dddddd !important',
  },
  notification: {
    position: 'fixed',
    top: '2rem',
    right: '2rem',
    background: 'cornflowerblue',
    padding: '1rem',
    borderRadius: '.2rem',
  },
  wrapper: {
    padding: '1rem',
  },
  h100: {
    minHeight: '100vh',
  },
  form__input: {
    padding: '12px 14px',
  },
  chat: {
    maxWidth: '800px',
    minHeight: '100vh',
    margin: '0 auto',
    textAlign: 'center',
  },
  chat__header: {
    height: 'fit-content',
  },
  chat__footer: {
    position: 'sticky',
    bottom: '1rem',
    alignItems: 'flex-end',
    display: 'flex',
  },
  chat__form: {
    width: '90%',
    margin: '0 5%',
  },
  chat__message: {
    minWidth: '40%',
    marginBottom: '.5rem',
    padding: 3,
    textAlign: 'left',
  },
  message__title: {
    fontSize: 14,
  },
}));
