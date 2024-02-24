import { Icon } from '../Icon'
import completedIcon from '../../../assets/images/Done_round_duotone.svg'

export function CompletedTaskIcon() {
  return (
    <Icon variant="success">
      <img src={completedIcon} />
    </Icon>
  )
}
