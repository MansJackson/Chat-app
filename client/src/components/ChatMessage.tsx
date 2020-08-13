import React from 'react';
import {
  Card, CardContent, Typography, Grid,
} from '@material-ui/core';
import useStyles from '../styles';

export default function ChatMessage(
  props: { name: string, message: string, type: string },
): JSX.Element {
  const classes = useStyles();
  const { name, message, type } = props;

  function renderMessage(): JSX.Element {
    if (type === 'connect') {
      return (
        <Grid container justify="center">
          <Typography color="primary">
            {name}
            {' '}
            {message}
          </Typography>
        </Grid>
      );
    } if (type === 'disconnect') {
      return (
        <Grid container justify="center">
          <Typography color="secondary">
            {name}
            {' '}
            {message}
          </Typography>
        </Grid>
      );
    }
    return (
      <>
        {type === 'recieved' ? <Grid item xs={4} /> : null}
        <Grid item xs={8}>
          <Card
            className={
              `${classes.chat__message}
              ${type === 'sent' ? classes.sent_message : classes.recieved_message}`
            }
          >
            <CardContent>
              <Typography className={classes.message__title} color="textSecondary">
                {name}
              </Typography>
              <Typography variant="body2" component="p">
                {message}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {type === 'sent' ? <Grid item xs={4} /> : null}
      </>
    );
  }

  return (
    <Grid container justify="flex-start" className={classes.chat__message}>
      {renderMessage()}
    </Grid>
  );
}
