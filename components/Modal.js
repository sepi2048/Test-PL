import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";

import { useModalState, useModalDispatch } from "../context/modal";
import { useCheckoutDispatch } from "../context/checkout";
import { useCartState } from "../context/cart";

import Breadcrumbs from "./Breadcrumbs";
import Cart from "./Cart";
import Checkout from "./Checkout";

import { commerce } from "../lib/commerce";





// Pre-fetch all digital products and store the product_ids to digital_ids
// Add cart content to digital checkout
// Only buy one ebook

function CurrentStep( props ) {
  const { id, line_items } = useCartState();

  let step = props.step;

  const digital_ids = props.products;
  
  //['prod_nPEVlNJ6dla7dM'];

  //console.log(digital_ids);

  let cart_content = [];

  {line_items.map(( {product_id} ) => {
      var exists = digital_ids.includes(product_id) ? true : false;
      cart_content.push(exists);
  })}

  if (cart_content.every(Boolean)) { step = "checkout"}

  switch (step) {
    case "cart":
      return <Cart digital_ids={digital_ids}/>;
    case "checkout":
      return <Checkout cartId={id} digital_ids={digital_ids} />;
    default:
      return null;
  }
}

function Modal() {
  const { open, step } = useModalState();
  const { closeModal } = useModalDispatch();
  const { reset: resetCheckout } = useCheckoutDispatch();
  const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {

    const fetchDigitalProducts = async () => {

      const { data } = await commerce.products.list();

      const products = data.filter(({ active }) => active);

      let digital_products = [];


      // Not physical at all
      // Download two or more ebooks!
      products.map(( prod ) => {
        //var exists = prod.has.digital_delivery ? true : false;
        var exists = false;
        if (prod.has.digital_delivery && !prod.has.physical_delivery) {
          exists = true;
        }

        if (exists) { digital_products.push(prod.id); }
      })

      setProducts(digital_products);

    }

    fetchDigitalProducts();

    router.events.on("routeChangeStart", closeModal);

    return () => {
      router.events.off("routeChangeStart", closeModal);
    };
  }, []);



  const closeAndResetModal = () => {
    closeModal();
    resetCheckout();
  };

  return (

    <AnimatePresence>
      {open && (
        <motion.div
          className="bg-ecru-white z-50 fixed overflow-scroll inset-0"
          initial={{ opacity: 0, y: -50 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          exit={{ opacity: 0, y: -50 }}
        >
          <div className="h-full container mx-auto px-3 md:px-4 lg:px-5 flex flex-col justify-between">
            <div>
              <div className="py-3 md:py-4 lg:py-5 flex items-center justify-between">
                <Breadcrumbs inCart={step === "cart"} />

                <button
                  className="appearance-none leading-none text-black p-1 -mr-1 focus:outline-none"
                  onClick={closeAndResetModal}
                >
                  Close
                </button>
              </div>
            </div>
            <CurrentStep step={step} products={products} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Modal;
