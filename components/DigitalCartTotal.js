import cc from "classcat";


import { useCartState } from "../context/cart";
import { useModalDispatch } from "../context/modal";
import { useCheckoutState } from "../context/checkout";


import Button from "./Button";

export default function CartTotal() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { showCheckout } = useModalDispatch();
  const { processing, error } = useCheckoutState();


  const isEmpty = line_items.length === 0;

  return (


      <div className="flex items-center justify-between py-3 md:py-4 lg:py-5">
        {isEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="text-lg md:text-xl">
              Total: {subtotal?.formatted_with_symbol}, {total_unique_items}{" "}
              {total_unique_items === 1 ? "item" : "items"}
            </div>
            <div>
            {error && <span className="text-red-500 text-sm">{error}   </span>}
              <Button
                className={cc([
                  "appearance-none leading-none p-1 md:p-2 lg:p-3 text-lg md:text-xl",
                  {
                    "opacity-75 cursor-not-allowed": processing,
                  },
                ])}
                disabled={processing}
                //onClick={showCheckout}
                type="submit"

              >
                {processing ? "Processing order" : "Continue"}
              </Button>
            </div>
          </>
        )}
      </div>
  );
}
