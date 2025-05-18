import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import {UseSignup} from "./useSignup.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import Spinner from "../../ui/Spinner.jsx";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
    const {register,formState,getValues,handleSubmit,reset}=useForm();
    const {errors}=formState;
    const {signup,isLoading}=UseSignup();

    function onSubmit({fullName,email,password}){
        signup({fullName,email,password},{
            onSettled:reset()
        })

    }

    if (isLoading)return <Spinner/>

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input disabled={isLoading} type="text" id="fullName" {...register('fullName',{required:'This field is required'})}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input disabled={isLoading} type="email" id="email" {...register('email',{required:'This field is required',pattern:{value:/\S+@\S+\.\S+/, message:'Please provide a valid email address'}})}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input disabled={isLoading} type="password" id="password" {...register('password',{required:'This field is required',minLength:{value:8,message:'Password need a minimum of 8 characters'}})}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input disabled={isLoading} type="password" id="passwordConfirm" {...register('passwordConfirm',{required:'This field is required',validate:(value)=>value === getValues().password || 'Password need to match'})}/>
      </FormRow>

      <FormRow>
        <Button onClick={reset} disabled={isLoading} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>{!isLoading ?'Create new user':<SpinnerMini/>}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
