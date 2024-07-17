import { SVGProps } from "react"
import { ReactComponent as ChatIcon } from "../../assets/images/icons/chat-icon.svg"
import { ReactComponent as SendIcon } from "../../assets/images/icons/send-icon.svg"
import { ReactComponent as SendHoverIcon } from "../../assets/images/icons/send-hover-icon.svg"

const ICON_NAME_COMPONENT_MAP = {
  "chat-icon": ChatIcon,
  "send-icon": SendIcon,
  "send-hover-icon": SendHoverIcon,
}

export type IconName = keyof typeof ICON_NAME_COMPONENT_MAP

type Props = SVGProps<SVGSVGElement> & {
  name: IconName
  size?: number
  className?: string
  clickable?: boolean
  currentColor?: boolean
}

const Icon = ({ name, size = 30, ...restProps }: Props) => {
  if (ICON_NAME_COMPONENT_MAP[name]) {
    const IconComponent = ICON_NAME_COMPONENT_MAP[name]

    return <IconComponent width={size} height={size} {...restProps} />
  }

  return null
}

export default Icon
