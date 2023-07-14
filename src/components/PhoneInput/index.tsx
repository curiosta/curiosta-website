import region from "@api/region";
import Input from "@components/Input";
import Select from "@components/Select";
import Typography from "@components/Typography";
import { Listbox } from "@headlessui/react";
import countryPrefixes from "country-prefixes";

const PhoneInput = () => {
  return (
    <div className="flex col-span-2">
      <Select roundedAvatars={false} minimalStyle defaultValue={region.selectedCountry.value?.iso_2 || ''} options={region.countries.value.map((c, i) => ({ id: c.iso_2, label: c.prefix || 'N/A', value: c.iso_2 || 'N/A', avatar: `/countries/${c.iso_2}.svg` }))} ListBoxValueComponent={({ selected }) => {
        return (
          <div className="flex">
            <Input label="Phone" type="tel" required rules={{
              minLength: {
                value: countryPrefixes[selected?.id || ''][1] || 0,
                message: `Atleast ${countryPrefixes[selected?.id || ''][1]} digits are required!`
              },
            }} leftAdornment={
              <Listbox.Button className="flex pr-3 items-center">
                {(
                  <>
                    <img src={selected?.avatar} className="w-6 mr-2" />
                    <Typography size="body2/normal">{(countryPrefixes[selected?.value || '']?.[0] || '')}</Typography>
                  </>
                ) as any}
              </Listbox.Button>
            } />
          </div>
        )
      }} />
    </div>
  )
}

export default PhoneInput;