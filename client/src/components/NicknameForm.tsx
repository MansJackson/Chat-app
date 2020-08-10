import React from 'react';
import {
  Grid, TextField, Button, Typography, Paper,
} from '@material-ui/core';
import { connect } from 'react-redux';
import submitNickname from '../actions/nicknameFormActions';
import updateInput from '../actions/inputActions';
import { INicknameFormProps, INicknameFormDispatch, IRootState } from '../interfaces';
import useStyles from '../styles';

function NicknameForm(props: INicknameFormProps & INicknameFormDispatch): JSX.Element {
  const classes = useStyles();
  const { input, sendNickname, setInput } = props;

  return (
    <Grid container justify="center" alignItems="center" className={classes.h100}>
      <Paper elevation={3} style={{ padding: '2rem 3rem', background: '#f5f5f547' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendNickname(input);
          }}
          className={classes.NicknameForm}
          noValidate
          autoComplete="off"
        >
          <Typography align="center" component="h4" variant="h4" style={{ paddingBottom: '1rem' }}>
            Choose a nickname
          </Typography>
          <TextField
            onChange={(e) => {
              setInput(e.target.value);
            }}
            label="Nickname"
            variant="outlined"
            autoFocus
          />
          <Button
            onClick={() => {
              sendNickname(input);
            }}
            variant="contained"
            size="large"
            color="primary"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}

const mapStateToProps = (state: IRootState) => ({
  input: state.input,
});

export default connect(
  mapStateToProps,
  { sendNickname: submitNickname, setInput: updateInput },
  // @ts-ignore
)(NicknameForm);
