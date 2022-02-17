import { useCartState } from "../context/cart";
import { useModalDispatch } from "../context/modal";

import Button from "./Button";
import CartItem from "./DigitalCartItem";
import CartTotal from "./DigitalCartTotal";



export default function Cart() {
  const { line_items, subtotal, total_unique_items } = useCartState();
  const { showCheckout } = useModalDispatch();

  const isEmpty = line_items.length === 0;

  return (
    <div className="flex flex-col justify-between">
      <div>
        {line_items.map((item) => (
          <CartItem key={item.id} {...item} />
        ))}
      </div>

      <div className="flex items-center justify-between py-3 md:py-4 lg:py-5">
        {isEmpty ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <div className="text-lg md:text-xl">

            </div>
          </>
        )}
      </div>
    </div>
  );
}
