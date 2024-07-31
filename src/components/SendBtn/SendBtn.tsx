import { useState } from "react"
import Icon from "../Icon"
import styles from "../SendBtn/SendBtn.module.css"

type Props = {
  handleSendClick: () => void
  isLoading: boolean
}

const SvgButton = ({ handleSendClick, isLoading }: Props) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    setIsActive(false)
  }
  const handleMouseDown = () => setIsActive(true)
  const handleMouseUp = () => setIsActive(false)

  return (
    <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className={styles.sendBtnContainer}
      onClick={handleSendClick}
      disabled={isLoading}
    >
      {isHovered || isActive ? (
        <Icon
          name="send-hover-icon"
          size={35}
          className={styles.sendBtnHover}
        />
      ) : (
        <Icon name="send-icon" size={35} />
      )}
    </button>
  )
}

export default SvgButton
