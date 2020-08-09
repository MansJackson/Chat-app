import React from 'react';
import { connect } from 'react-redux';
import Chat from './Chat';
import NicknameForm from './NicknameForm';
import useStyles from '../styles';
import { IHomeProps } from '../interfaces';

function Home(props: IHomeProps) {
  const { notification, nickname } = props;
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      {notification !== ''
        ? <div className={classes.notification}>{notification}</div>
        : null}
      {nickname !== ''
        ? <Chat />
        : <NicknameForm />}
    </div>
  );
}

const mapStateToProps = (state: IHomeProps) => ({
  nickname: state.nickname,
  notification: state.notification,
});

export default connect(mapStateToProps)(Home);
