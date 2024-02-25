import { InputHTMLAttributes, forwardRef } from "react"
import { InputRadio } from "../../atoms/InputRadio";
import { CheckedIconWrapper, InputRadioWrapper } from "./styles";

type TFormField = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon: JSX.Element
};

export const TaskStatusInputField = forwardRef<HTMLInputElement, TFormField>(
  ({ label, icon, checked, ...rest }, ref) => {
    return (
      <label className="form-control w-72">
        <InputRadioWrapper
          checked={checked || false}
          className="label border rounded-2xl p-2"
        >
          <div className="flex justify-start items-center gap-4">
            {icon}
            <span className="label-text">{label}</span>
            <InputRadio {...rest} ref={ref} className="hidden" />
          </div>
          {checked && <CheckedIconWrapper className="rounded-full"></CheckedIconWrapper>}
        </InputRadioWrapper>
      </label>
    );
  }
);
