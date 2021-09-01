import { Button } from "@material-ui/core";

import styles from "./QuitConfirmationModal.module.css";

function QuitConfirmationModal({ toggleModal, handleQuit }) {
  return (
    <div className={styles.modalBody}>
      <div className={styles.messageWrapper}>
        <p className={styles.message}>
          Are you sure you want to quit the quiz?
        </p>
      </div>

      <div className={styles.buttons}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleQuit()}
          className={styles.danger}
        >
          Yes
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => toggleModal(false)}
          className={styles.primary}
        >
          No
        </Button>
      </div>
    </div>
  );
}

export default QuitConfirmationModal;
