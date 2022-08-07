import classes from "./Error.module.css";

const Error = ({ message,style }) => {
  return (
    <div className={classes.container} style={style}>
      <p className={classes.message}>{message}</p>
    </div>
  );
};

export default Error;
