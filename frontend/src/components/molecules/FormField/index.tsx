import { InputHTMLAttributes, forwardRef } from "react"
import { InputField } from "../../atoms/InputField";

type TFormField = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const FormField = forwardRef<HTMLInputElement, TFormField>(
  ({ label, error, ...rest }, ref) => {
    const className = error ? 'input-error' : ''

    return (
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <InputField {...rest} ref={ref} className={className} />
        {error && <div className="label">
          <span className="label-text-alt">{error}</span>
        </div>}
      </label>
    );
  }
);
