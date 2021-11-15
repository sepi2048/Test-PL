import Button from "../Button";
import WatermarkPDF from '../../src/components/WatermarkPDF'



function CheckoutSummary({ has, fulfillment, order, id }) {
  const { subtotal, tax, shipping, line_items, total } = order;
  const url = "/api/getPDF?id="+id;

  const count = line_items.length;

  const checSecretAPIKey = process.env.CHEC_SECRET_KEY;
  //console.log(checSecretAPIKey);


  return (
    <div className="py-6">
      <div className="md:flex md:justify-between md:space-x-6">
        <div className="w-full md:w-1/2">
          <ol>
            <li>Subtotal: {subtotal.formatted_with_symbol}</li>
            {tax && <li>Tax: {tax.amount.formatted_with_symbol}</li>}
            {shipping && (
              <li>Shipping: {shipping.price.formatted_with_symbol}</li>
            )}
            {total && (
              <li className="text-lg md:text-xl py-3">
                Total: {total.formatted_with_symbol}, {count}{" "}
                {count === 1 ? "item" : "items"}
              </li>
            )}
          </ol>


        </div>
        {has.digital_fulfillment && (
          <div className="w-full md:w-1/2 md:flex md:items-end md:justify-end space-y-3 md:space-y-0 md:space-x-3">
            {fulfillment.digital.downloads.map((download, index) => (
              <div
                className="md:flex space-y-3 md:space-y-0 md:space-x-3"
                key={index}
              >
                {download.packages.map(({ name }, index) => (      
                  

                  <Button
                  key={index}
                  href={url}
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Download {name}
                </Button>


                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CheckoutSummary;
