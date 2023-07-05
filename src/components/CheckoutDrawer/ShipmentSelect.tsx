import cart from "@api/cart"
import { checkoutOpen } from "@store/checkoutStore"
import priceToCurrency from "@utils/priceToCurrency"
import { cx } from "class-variance-authority"
import { useEffect } from "preact/hooks"

const ShipmentSelect = () => {
  const listOfAvailableShipmentProviders = async () => {
    if (!cart.shipping.options.value?.length) {
      await cart.listShippingMethods();
    }
    const firstShippingOption = cart.shipping.options.value?.[0];
    if (firstShippingOption?.id) {
      await cart.updateShippingMethod(firstShippingOption.id)
    }
  }

  useEffect(() => {
    if (!checkoutOpen.value) return;
    listOfAvailableShipmentProviders();
  }, [checkoutOpen.value])

  const disabled = cart.loading.value?.startsWith('cart:shipping');

  return (
    <>
      <div class="mt-10 border-t border-gray-200 pt-10">
        <fieldset>
          <legend class="text-lg font-medium text-gray-900">Delivery method</legend>
          <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
            {
              (cart.shipping.options?.value || []).map((option) => {
                const activeOption = option.id && cart.shipping.selectedOption.value === option.id;
                return (
                  <div class={cx(`relative flex cursor-pointer rounded-lg bg-white p-4 shadow-sm focus:outline-none focus:border focus:ring-primary-600 focus:ring-2`, activeOption && `outline-none border ring-2 ring-primary-600`, disabled && `!bg-gray-100 pointer-events-none`)} tabIndex={1} onClick={() => {
                    if (disabled) return;
                    !disabled && option.id && option.id !== cart.shipping.selectedOption.value && cart.updateShippingMethod(option.id)
                  }}>
                    <span class="flex flex-1">
                      <span class="flex flex-col">
                        <span id="delivery-method-0-label" class="block text-sm font-medium text-gray-900">{option.name}</span>
                        <span id="delivery-method-0-description-1" class="mt-6 text-sm font-medium text-gray-900">{priceToCurrency(option.price_incl_tax)} (inc. taxes)</span>
                      </span>
                    </span>
                    {activeOption ? <svg class="h-5 w-5 text-app-primary-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
                    </svg> : null}
                    <span class="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                  </div>
                )
              })
            }

          </div>
        </fieldset>
      </div>
    </>
  )
}

export default ShipmentSelect