import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Grid, Button } from '@material-ui/core';
import useStyles from '../styles';
import { IChatProps, IChatMessage, IRootState } from '../interfaces';

import { recievedMessage, disconnect } from '../actions/chatActions';
import updateUserCount from '../actions/userCountActions';
import ChatBox from './ChatMessage';
import ChatTopbar from './ChatTopbar';
import ChatMessageInput from './ChatMessageInput';
import updateInput from '../actions/inputActions';
import notification from '../actions/notificationActions';
import createSocket from '../actions/socketActions';

function Chat(props: IChatProps) {
  const {
    nickname,
    messages,
    socket,
    recievedMsg,
    setInput,
    discon,
    notify,
    updateUsers,
    connectSocket,
  } = props;
  const classes = useStyles();

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo(0, document.body.offsetHeight);
    }, 100);
  }

  useEffect(() => {
    setInput('');
    connectSocket();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!socket) return;

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
  }, [socket]);

  function exitChat() {
    socket.close();
    discon();
    notify('You left the chat');
  }

  return (
    <>
      <div className={classes.chat_topbar}>
        <ChatTopbar />
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
        <ChatMessageInput />
      </Grid>
    </>
  );
}

const mapStateToProps = (state: IRootState) => ({
  messages: state.messages,
  nickname: state.nickname,
  socket: state.socket,
});

export default connect(mapStateToProps, {
  recievedMsg: recievedMessage,
  discon: disconnect,
  updateUsers: updateUserCount,
  setInput: updateInput,
  notify: notification,
  connectSocket: createSocket,
  // @ts-ignore
})(Chat);
