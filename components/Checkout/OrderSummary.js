import Button from "../Button";


function CheckoutSummary({ has, fulfillment, order, id, extra_fields }) {
  const { subtotal, tax, shipping, line_items, total } = order;
  const url = "/api/getPDF?id="+id+"&dwnld=";


  {fulfillment.digital.downloads.map((download, index) => {

    download.packages.map((packages) => {

      console.log(url+packages.id);
      console.log(url+packages);

    } 
    )
  })}

  console.log(order);




  // Order-id + id dwnld_ypbroE6Gx358n4/ful_VNplJa1EaYwL60

  const count = line_items.length;

  // Multiple downloads
  // 1) Test kjøp 2 ebøker
  //  -> Funker ulik link? (både summary + mail)

  // 2) Test Mail, to nedlastnings knapper   
  //  (egen odre-email) - TEST

  // 3) Empty cart 


  return (
    <div className="py-6">
{/* 
      {extra_fields.map(( {id, value} ) => {

      console.log(id, " ", value);
      console.log(extra_fields);

      })} */}

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
                {download.packages.map((packages, index) => (   
                                    

                  <Button
                  key={index}
                  href={url+packages.id}
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Download {packages.name}
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
