import { Icon } from '../Icon'
import inProgressIcon from '../../../assets/images/Time_atack_duotone.svg'

export function InProgressTaskIcon() {
  return (
    <Icon variant="info">
      <img src={inProgressIcon} />
    </Icon>
  )
}
