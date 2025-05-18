import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import {useBooking} from "./useBooking.js";
import Spinner from "../../ui/Spinner.jsx";
import {useNavigate} from "react-router-dom";
import {HiArrowUpOnSquare} from "react-icons/hi2";
import {useCheckout} from "../check-in-out/useCheckout.js";
import {HiTrash} from "react-icons/hi";
import {useDeleteBooking} from "./useDeleteBooking.js";
import RowDetails from "../../ui/RowDetails.jsx";
import {Modal} from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Empty from "../../ui/Empty.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const {booking,isLoading} = useBooking();
  const navigate=useNavigate();
  const {checkout,isCheckinOut}=useCheckout()
  const {deleteBookingItem,isDeleting}=useDeleteBooking();


  const moveBack = useMoveBack();

  if (isLoading) return <Spinner/>
  if (!booking)return <Empty resourceName='booking'/>

  const {status,id:bookingId} = booking;



  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };


  return (
    <>
      <RowDetails type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </RowDetails>


      <BookingDataBox booking={booking} />

      <ButtonGroup>
          {status === 'unconfirmed' &&
              <Button onClick={() => navigate(`/checkin/${bookingId}`)}>Check in</Button>
          }
        {status === 'checked-in' &&
            <Button onClick={() =>checkout({bookingId})} disabled={isCheckinOut} icon={<HiArrowUpOnSquare/>}>Check out</Button>
        }

        <Modal>
          <Modal.Open opens='delete'>
            <Button $variation='danger' icon={<HiTrash/>}>Delete booking</Button>
          </Modal.Open>

          <Modal.Window name='delete'>
            <ConfirmDelete disabled={isDeleting} resourceName='booking' onConfirm={()=>deleteBookingItem(bookingId,{
              onSettled:()=> navigate(-1)
            })} />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
