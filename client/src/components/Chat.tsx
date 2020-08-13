import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import {
  Input,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Popover,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import useStyles from '../styles';

import { sendMessage, recievedMessage, disconnect } from '../actions/chatActions';
import updateUserCount from '../actions/userCountActions';
import notification from '../actions/notificationActions';
import updateInput from '../actions/inputActions';
import ChatBox from './ChatMessage';
import { IChatProps, IChatMessage, IRootState } from '../interfaces';

let socket: SocketIOClient.Socket;

function Chat(props: IChatProps) {
  const {
    users,
    userCount,
    nickname,
    messages,
    input,
    sendMsg,
    recievedMsg,
    setInput,
    discon,
    notify,
    updateUsers,
  } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.offsetHeight);
    }, 100);
  }

  useEffect(() => {
    setInput('');
    socket = io(window.location.href, { reconnection: false });

    socket.on('connect', () => {
      socket.emit('nickname', nickname);
      updateUsers();
    });

    socket.on('connect_error', () => {
      socket.close();
      discon();
      notify('There was an error connecting');
    });

    socket.on('connect_timeout', () => {
      socket.close();
      discon();
      notify('Connection request timed out');
    });

    socket.on('error', (err: Error) => {
      socket.close();
      discon();
      notify(`Unexpected error: ${err.message}`);
    });

    socket.on('chat-message', (data: IChatMessage) => {
      recievedMsg(data.nickname, data.message, data.type, data.time);
      updateUsers();
      scrollToBottom();
    });

    socket.on('timeout', (data: { message: string }) => {
      socket.close();
      discon();
      notify(data.message);
    });

    socket.on('shut-down', (message: string) => {
      socket.close();
      discon();
      notify(message);
    });
    // eslint-disable-next-line
  }, []);

  function verifyMessage() {
    if (input.trim().length > 0) {
      sendMsg(nickname, input, socket);
      scrollToBottom();
    } else notify('Message can not be empty');
    setInput('');
  }

  function exitChat() {
    socket.close();
    discon();
    notify('You left the chat');
  }

  return (
    <>
      <div className={classes.chat_topbar}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
              Connected Users:
              {' '}
              {userCount}
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              {users.map((el) => (
                <Typography className={classes.popover_username}>{el}</Typography>
              ))}
            </Popover>
          </Toolbar>
        </AppBar>
        <Button
          onClick={exitChat}
          className={classes.disconnect_btn}
          variant="contained"
          size="small"
          color="secondary"
        >
          Disconnect
        </Button>
      </div>
      <Grid container justify="center" className={classes.chat}>
        <Grid item xs={12} sm={10} md={8} lg={8}>
          {messages.length > 0
            ? messages.map((el) => (
              <ChatBox
                key={uuidv4()}
                name={el.nickname}
                message={el.message}
                type={el.type}
                time={el.time}
              />
            ))
            : null}
        </Grid>
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
      </Grid>
    </>
  );
}

const mapStateToProps = (state: IRootState) => ({
  messages: state.messages,
  nickname: state.nickname,
  input: state.input,
  userCount: state.userCount,
  users: state.userList,
});

export default connect(mapStateToProps, {
  sendMsg: sendMessage,
  recievedMsg: recievedMessage,
  setInput: updateInput,
  discon: disconnect,
  notify: notification,
  updateUsers: updateUserCount,
  // @ts-ignore
})(Chat);
