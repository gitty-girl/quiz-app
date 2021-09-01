import { Alert } from "@material-ui/lab";

import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ children }) => {
  return (
    <Alert variant="outlined" severity="error" className={styles.errorMessage}>
      {children}
    </Alert>
  );
};

export default ErrorMessage;
