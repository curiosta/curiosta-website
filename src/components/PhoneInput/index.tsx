import { Controller, FieldValues, RegisterOptions, useFormContext } from "react-hook-form";
import PhoneInputCore, { TPhoneInputCore } from "./core";
import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

const PhoneInput = ({ value, ...props }: TPhoneInputCore) => {
  const controller = useFormContext()
  const rules = useSignal<Omit<RegisterOptions<FieldValues, "phone">, "disabled" | "setValueAs" | "valueAsNumber" | "valueAsDate"> | undefined>(undefined);

  useEffect(() => {
    if (value !== undefined && value !== null && controller && props.name) {
      controller.setValue(props.name, value, { shouldValidate: true });
    }
  }, [value]);

  if (!controller) {
    return <PhoneInputCore value={value} {...props} />
  }

  return (
    <Controller
      name="phone"
      rules={rules.value}
      render={({ field, fieldState }) => {
        return <PhoneInputCore {...fieldState} onChange={(value) => {
          field.onChange(value)
        }} /> as any
      }
      }
    />
  )
}

export default PhoneInput;