import React from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { connect } from 'react-redux';
import useStyles from '../styles';
import { IRootState, IChatMessageInputProps, IChatMessageInputDispatch } from '../interfaces';
import { sendMessage } from '../actions/chatActions';
import updateInput from '../actions/inputActions';
import notification from '../actions/notificationActions';

function ChatMessageInput(props: IChatMessageInputProps & IChatMessageInputDispatch) {
  const classes = useStyles();
  const {
    input, nickname, socket, sendMsg, notify, setInput,
  } = props;

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.offsetHeight);
    }, 100);
  }

  function verifyMessage() {
    if (input.trim().length > 0) {
      sendMsg(nickname, input, socket);
      scrollToBottom();
    } else notify('Message can not be empty');
    setInput('');
  }

  return (
    <Grid className={classes.chat__footer} id="chatFooter" item xs={12} sm={10} md={8}>
      <form
        autoComplete="off"
        className={classes.chat__form}
        onSubmit={(e) => {
          e.preventDefault();
          verifyMessage();
        }}
      >
        <FormControl fullWidth>
          <InputLabel>Message</InputLabel>
          <Input
            id="message_input"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton onClick={() => {
                  verifyMessage();
                  scrollToBottom();
                }}
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
      </form>
    </Grid>
  );
}

const mapStateToProps = (state: IRootState) => ({
  nickname: state.nickname,
  input: state.input,
  socket: state.socket,
});

export default connect(
  mapStateToProps,
  { sendMsg: sendMessage, notify: notification, setInput: updateInput },
  // @ts-ignore
)(ChatMessageInput);
