import { createContext, forwardRef, HTMLAttributes, useContext, useImperativeHandle } from 'preact/compat';
import { FieldValues, FormProvider, useForm, UseFormProps } from 'react-hook-form';
const FormControlContext = createContext({});

export const useFormControl = () => useContext(FormControlContext);

export type TFormControlProps = Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> & UseFormProps<FieldValues> & {
  onSubmit?: (data: any) => void;
};

const FormControl = forwardRef<HTMLFormElement, TFormControlProps>(
  ({ children, mode = 'onChange', ...props }, ref) => {
    const form = useForm({ mode, ...props });
    return (
      <>
        <FormProvider {...form}>
          <form
            ref={ref}
            method="GET"
            {...props}
            onSubmit={
              props.onSubmit ? form.handleSubmit(props.onSubmit) : (e) => e.preventDefault()
            }>
            {children}
          </form>
        </FormProvider>
      </>
    );
  }
);

FormControl.displayName = 'FormControl';

export default FormControl;
