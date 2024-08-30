import { Modal, Button, Title } from "@mantine/core"
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
      title={<Title order={4}>Restart Chat</Title>}
      opened={openedModal}
      onClose={close}
      size="16em"
      classNames={{
        overlay: styles.modalOverlay,
        inner: styles.modalInner,
        content: styles.modalContent,
        header: styles.modalHeader,
        body: styles.modalBody,
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
          color="var(--mantine-yellow-soft)"
          onClick={close}
          classNames={{ label: styles.btnLabel, root: styles.btnNo }}
        >
          No
        </Button>
        <Button
          color="var(--mantine-blue-soft)"
          onClick={onClearChat}
          classNames={{ label: styles.btnLabel, root: styles.btnYes }}
        >
          Yes
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
