import { Modal, Button } from "@mantine/core"
import styles from "./ConfirmationModal.module.css"
import { IconX } from "@tabler/icons-react"

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
      title="Restart Chat"
      opened={openedModal}
      onClose={close}
      classNames={{
        overlay: styles.modalOverlay,
        inner: styles.modalInner,
        content: styles.modalContent,
        close: styles.closeBtn,
      }}
      withinPortal={false}
      closeButtonProps={{
        icon: <IconX aria-label="Close button" />,
      }}
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
