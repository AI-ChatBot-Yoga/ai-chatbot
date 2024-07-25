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
      size="sm"
      classNames={{
        overlay: styles.modalOverlay,
        inner: styles.modalInner,
        content: styles.modalContent,
      }}
      withinPortal={false}
    >
      <p>{modalMessage}</p>
      <div className={styles.modalButtons}>
        <Button
          color="red"
          onClick={close}
          classNames={{ label: styles.btnLabel }}
        >
          No
        </Button>
        <Button onClick={onClearChat} classNames={{ label: styles.btnLabel }}>
          Yes
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
