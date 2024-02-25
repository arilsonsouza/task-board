import { InputHTMLAttributes, forwardRef } from "react"
import { TextField } from "../../atoms/TextField";

type TFormField = InputHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export const FormTextField = forwardRef<HTMLTextAreaElement, TFormField>(
  ({ label, error, ...rest }, ref) => {
    const className = error ? 'input-error' : ''

    return (
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <TextField {...rest} ref={ref} className={className} />
        {error && <div className="label">
          <span className="label-text-alt">{error}</span>
        </div>}
      </label>
    );
  }
);
