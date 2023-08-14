import region from "@api/region";
import InputCore, { type InputCoreProps } from "@components/Input/core";
import Select from "@components/Select";
import Typography from "@components/Typography";
import { Listbox } from "@headlessui/react";
import { Signal, useSignal } from "@preact/signals";
import countryPrefixes from "country-prefixes";
import { useEffect, type FC } from "preact/compat";
import { Controller, type FieldValues, type RegisterOptions } from "react-hook-form";

export type TPhoneInputCore = Omit<InputCoreProps, 'onChange'> & {
  onChange?: (value: string) => void,
}

const PhoneInputCore: FC<TPhoneInputCore> = ({ onChange, ...props }) => {
  const selectedCountry = useSignal<string | null>(countryPrefixes[region.selectedCountry.value?.iso_2 || '']?.[0] || null);
  const selectedCountryIso = useSignal<string | undefined>(region.selectedCountry.value?.iso_2);
  const inputValue = useSignal<string | null>(null);

  useEffect(() => {
    if (selectedCountry.value === null || inputValue.value === null) {
      return;
    }
    onChange?.(selectedCountry.value + inputValue.value)
  }, [selectedCountry.value, inputValue.value])

  return (
    <div className="flex col-span-2">
      {
        <Controller
          name="phone-number"
          render={
            ({ field, fieldState, formState }) => (
              <div>
                <Select
                  onChange={(option) => {
                    selectedCountry.value = countryPrefixes[option?.value || '']?.[0];
                    selectedCountryIso.value = option?.value;
                  }}
                  roundedAvatars={false}
                  minimalStyle
                  defaultValue={region.selectedCountry.value?.iso_2 || ''}
                  options={region.countries.value.map((c) => ({
                    id: c.iso_2,
                    label: c.prefix || 'N/A',
                    value: c.iso_2 || 'N/A',
                    avatar: `/countries/${c.iso_2}.svg`
                  }))}

                  ListBoxValueComponent={({ selected }) => {
                    return (
                      <div className="flex">
                        <InputCore label="Phone" required type="number" leftAdornment={
                          <Listbox.Button className="flex pr-3 items-center">
                            {(
                              <>
                                <img src={selected?.avatar} className="w-6 mr-2" />
                                <Typography size="body2/normal">{(countryPrefixes[selected?.value || '']?.[0] || '')}</Typography>
                              </>
                            ) as any}
                          </Listbox.Button>
                        } {...props} {...field} />
                      </div>
                    )
                  }}
                />
                {fieldState.error ? <Typography variant="error">{fieldState.error.message}</Typography> : null}
              </div> as any)
          }
          rules={{
            minLength: {
              message: `Atleast ${countryPrefixes[selectedCountryIso.value || '']?.[1]} numbers are required!`,
              value: countryPrefixes[selectedCountryIso.value || '']?.[1]
            },
            maxLength: {
              message: `Maximum ${countryPrefixes[selectedCountryIso.value || '']?.[1]} numbers are allowed!`,
              value: countryPrefixes[selectedCountryIso.value || '']?.[1]
            },
            required: {
              value: true,
              message: 'Phone is required!'
            }
          }}
        />}
    </div>
  )
}

export default PhoneInputCore;