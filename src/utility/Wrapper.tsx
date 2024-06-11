import classes from "./Wrapper.module.css";

interface Props {
  children?: React.ReactNode;
}

const Wrapper: React.FC<Props> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Wrapper;
