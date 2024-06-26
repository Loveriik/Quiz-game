import classes from "./Wrapper.module.css";

import { WrapperProps } from "../devDependencies/dependencies";

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default Wrapper;
