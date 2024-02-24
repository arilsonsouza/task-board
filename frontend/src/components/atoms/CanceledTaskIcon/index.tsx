import { Icon } from '../Icon'
import canceledIcon from '../../../assets/images/close_ring_duotone.svg'

export function CanceledTaskIcon() {
  return (
    <Icon variant="error">
      <img src={canceledIcon} />
    </Icon>
  )
}
