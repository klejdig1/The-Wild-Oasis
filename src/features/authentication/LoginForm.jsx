import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRow from "../../ui/FormRow.jsx";
import RowLogin from "../../ui/RowLogin.jsx";
import {useLogin} from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {HiEye, HiEyeOff} from "react-icons/hi";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,isLoading}=useLogin();
  const [showPassword, setShowPassword] = useState(false);


    function handleSubmit(e) {
   e.preventDefault();
   if (!email || !password)return;

   login({email,password},{
       onSettled:()=>{
           setEmail('')
               setPassword('')
       }
   })

  }


  return (
    <Form  onSubmit={handleSubmit}>
      <RowLogin label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </RowLogin>
      <RowLogin label="Password">
          <div style={{position:"relative"}}>
        <Input
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
          <span onClick={()=>setShowPassword(s=>!s)} style={{position:"absolute", top: "50%",
              right: "0.8rem",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#555",}}>
              {showPassword ? <HiEye/> : <HiEyeOff/>}
          </span>
          </div>
      </RowLogin>
      <FormRow>
        <Button disabled={isLoading} size="large">{!isLoading?'Log in':<SpinnerMini/>}</Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
