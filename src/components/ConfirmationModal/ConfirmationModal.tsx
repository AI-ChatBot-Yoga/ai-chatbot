import { Modal, Button } from "@mantine/core"
import styles from "./ConfirmationModal.module.css"

interface ConfirmationModalProps {
  openedModal: boolean
  close: () => void
  onClearChat: () => void
  modalMessage: string
}

const ConfirmationModal = ({
  openedModal,
  close,
  onClearChat,
  modalMessage,
}: ConfirmationModalProps) => {
  return (
    <Modal
      opened={openedModal}
      onClose={close}
      className={styles.modalContainer}
      withinPortal={false}
    >
      <p>{modalMessage}</p>
      <div className={styles.modalButtons}>
        <Button color="red" onClick={close}>
          No
        </Button>
        <Button onClick={onClearChat}>Yes</Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
