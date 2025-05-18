import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";
import {Modal} from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";


const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;



function CabinRow({cabin}){

    const {isLoading,deleteCabin}=useDeleteCabin();
    const {createCabin,isLoading:isCreating}=useCreateCabin();


    const {id,image,name,discount,maxCapacity,regularPrice,description}=cabin;

    function handleDuplicate(){
        createCabin({
            name:`Copy of ${name}`,
            maxCapacity,regularPrice,image,discount,description
        })

    }


    return(
        <Table.Row >
            <Img src={image} alt='cabins/image'/>
            <Cabin>{name}</Cabin>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? <Discount>{formatCurrency(discount)}</Discount>:'-'}
            <div>
                <Modal>
                    <Menus.Menu>
                        <Menus.Toggle id={id}/>

                        <Menus.List id={id}>
                            <Menus.Button icon={<HiSquare2Stack/>} disabled={isCreating} onClick={handleDuplicate}>Duplicate</Menus.Button>

                            <Modal.Open opens='edit'>
                                <Menus.Button icon={<HiPencil/>}>Edit</Menus.Button>
                            </Modal.Open>

                            <Modal.Open opens='delete'>
                                <Menus.Button icon={<HiTrash/>}>Delete</Menus.Button>
                            </Modal.Open>
                        </Menus.List>

                    <Modal.Window name='edit'>
                        <CreateCabinForm cabinToEdit={cabin}/>
                    </Modal.Window>

                    <Modal.Window name='delete'>
                        <ConfirmDelete onCloseModal={onclose} disabled={isLoading} resourceName='cabins' onConfirm={()=>deleteCabin(id)}/>
                    </Modal.Window>

                   </Menus.Menu>
                </Modal>

            </div>
        </Table.Row>
    )
}

export default CabinRow;

