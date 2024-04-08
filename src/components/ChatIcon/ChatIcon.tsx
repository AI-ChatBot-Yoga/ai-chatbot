import styles from "./ChatIcon.module.css"

type Props = {
  onChatActivation: () => void
}

const ChatIcon = ({ onChatActivation }: Props) => {
  return (
    <button
      onClick={onChatActivation}
      className={`chatIcon ${styles.chatIcon}`}
    >
      <svg
        fill="#000000"
        fillOpacity="0.2"
        height="50px"
        width="50px"
        version="1.1"
        id="chatIcon"
        viewBox="0 0 60 60"
      >
        <g>
          <path
            d="M57.348,0.793H12.652C11.189,0.793,10,1.983,10,3.446v7.347h34.348c2.565,0,4.652,2.087,4.652,4.653v25.347h1.586
          L60,50.207V3.446C60,1.983,58.811,0.793,57.348,0.793z"
          />
          <path
            d="M44.348,12.793H2.652C1.189,12.793,0,13.983,0,15.446v43.761l9.414-9.414h34.934c1.463,0,2.652-1.19,2.652-2.653V15.446
          C47,13.983,45.811,12.793,44.348,12.793z M11,22.793h12c0.553,0,1,0.448,1,1s-0.447,1-1,1H11c-0.553,0-1-0.448-1-1
          S10.447,22.793,11,22.793z M36,38.793H11c-0.553,0-1-0.448-1-1s0.447-1,1-1h25c0.553,0,1,0.448,1,1S36.553,38.793,36,38.793z
          M36,31.793H11c-0.553,0-1-0.448-1-1s0.447-1,1-1h25c0.553,0,1,0.448,1,1S36.553,31.793,36,31.793z"
          />
        </g>
      </svg>
    </button>
  )
}

export default ChatIcon
