import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  NicknameForm: {
    '& > *': {
      marginBottom: theme.spacing(1),
      width: '100%',
    },
  },
  chat_topbar: {
    width: 'fill-available',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  disconnect_btn: {
    position: 'fixed',
    top: '.5rem',
    right: '1rem',
    zIndex: 1,
  },
  h100: {
    minHeight: '100vh',
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
    zIndex: 999,
  },
  form__input: {
    padding: '12px 14px',
  },
  chat: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '4rem 0',
  },
  chat__header: {
    height: 'fit-content',
  },
  chat__footer: {
    position: 'fixed',
    bottom: '1rem',
    alignItems: 'flex-end',
    display: 'flex',
    width: 'fill-available',
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
    fontSize: 18,
  },
  message__body: {
    margin: '.5rem 0',
    fontSize: 18,
  },
  message__time: {
    margin: 0,
  },
}));
