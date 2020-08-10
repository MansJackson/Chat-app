import React from 'react';
import { Grid, TextField, Button, Typography } from '@material-ui/core';
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendNickname(input);
        }}
        className={classes.NicknameForm}
        noValidate
        autoComplete="off"
      >
        <Typography align="center" component="h4" variant="h4">
          Choose a nickname
        </Typography>
        <TextField
          onChange={(e) => {
            setInput(e.target.value);
          }}
          label="Nickname"
          variant="outlined"
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
