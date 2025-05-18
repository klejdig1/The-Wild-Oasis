
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useForm} from "react-hook-form";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateCabin} from "./useCreateCabin.js";
import {useEditCabin} from "./useEditCabin.js";



function CreateCabinForm({cabinToEdit = {},onCloseModal}) {

    const {isLoading,createCabin}=useCreateCabin();
    const {isEditing,editCabin}=useEditCabin();
    const isWorking=isLoading || isEditing;


    const {id:editId,...editValue}=cabinToEdit
    const isEditSession=Boolean(editId);

    const {register,handleSubmit,reset,getValues,formState}=useForm({
        defaultValues:isEditSession ? editValue :{},
    });

    const {errors}=formState;

    function onSubmit(data){
        const image = typeof data.image === 'string' ? data.image : data.image[0];

        if (isEditSession) editCabin({newCabinData:{...data,image},id:editId},{
            onSuccess:()=> {
                reset();
                onCloseModal?.()
            }
        })
        else createCabin({...data, image:image},{
            onSuccess:()=>{
                reset();
                onCloseModal?.();
            }
        })

    }

    function onError(errors){
        //console.log(errors)

    }


  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}  type={onCloseModal ? 'modal':'regular'}>

        <FormRow label='Cabin name' error={errors?.name?.message} children={
            <Input type="text" id="name" disabled={isWorking} {...register('name',{
                required:'This field is required',
            })}/>
        }>
        </FormRow>

        <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message} children={
            <Input type="number" id="maxCapacity" disabled={isWorking} {...register('maxCapacity',{
            required:'This field is required',
            min:{
                value:1,
                message:'Capacity should be at least 1  '
            }
        })}/>
        }>
      </FormRow>

        <FormRow label='Regular price' error={errors?.regularPrice?.message} children={
        <Input type="number" id="regularPrice" disabled={isWorking} {...register('regularPrice',{
            required:'This field is required',
            min:{
                value:1,
                message:'Price should be at least 1  '
            }
        })}/>
        }>
      </FormRow>

          <FormRow label='Discount' error={errors?.discount?.message} children={
        <Input type="number" id="discount" disabled={isWorking} defaultValue={0} {...register('discount',{
            required:'This field is required',
            validate: (value)=>value <= getValues().regularPrice|| 'Discount should be lees than price'
        })}/>
          }>
      </FormRow>

        <FormRow label='Description for website' error={errors?.description?.message} children={
        <Textarea type="number" id="description" disabled={isWorking} defaultValue="" {...register('description',{
            required:'This field is required',
        })}/>
        }>
      </FormRow>

        <FormRow label='Cabin photo' error={errors?.image?.message} children={''}>
        <FileInput id="image" disabled={isWorking} accept="image/*" {...register('image',{
            required: isEditSession ? false: 'This field is required',
        })}/>
      </FormRow>

      <FormRow>
        <Button onClick={()=>onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>{isEditSession ?'Edit cabin':'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
