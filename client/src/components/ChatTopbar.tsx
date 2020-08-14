import React from 'react';
import { connect } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Button,
  Popover,
  Typography,
} from '@material-ui/core';
import { IRootState, IChatTopbarProps } from '../interfaces';
import useStyles from '../styles';

function ChatTopbar(props: IChatTopbarProps) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const { userCount, users } = props;
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
  );
}

const mapStateToProps = (state: IRootState) => ({
  users: state.userList,
  userCount: state.userCount,
});

export default connect(mapStateToProps, {})(ChatTopbar);
