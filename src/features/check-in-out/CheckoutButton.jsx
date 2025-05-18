import Button from "../../ui/Button";
import {useCheckout} from "./useCheckout.js";

function CheckoutButton({ bookingId }) {
    const {checkout,isCheckinOut}=useCheckout()

  return (
    <Button onClick={()=>checkout({bookingId})} disabled={isCheckinOut} variation="primary" size="small">
      Check out
    </Button>
  );
}

export default CheckoutButton;
