import { InputHTMLAttributes, forwardRef } from "react"
import { InputRadio } from "../../atoms/InputRadio";
import { InputRadioWrapper } from "./styles";

type TFormField = InputHTMLAttributes<HTMLInputElement> & {
  icon: string
};

export const TaskIconInputField = forwardRef<HTMLInputElement, TFormField>(
  ({ icon, checked, ...rest }, ref) => {
    return (
      <label className="form-control">
        <InputRadioWrapper
          checked={checked || false}
          className="label border rounded-2xl"
        >
          <div className="flex justify-start items-center gap-4">
            {icon}
            <InputRadio {...rest} ref={ref} className="hidden" />
          </div>
        </InputRadioWrapper>
      </label>
    );
  }
);
