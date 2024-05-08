import { useState } from "react";

export const useForm = (InitialForm = {}) => {
    const [formState, setForm] = useState(InitialForm)
    
   
    const onInputChange = ({target}) => {
        const {name,value} = target;
        setForm({
            ...formState,
            [ name ]: value
            
        })
    }
    const onResetForm = () => {
        setForm(InitialForm);
    }
  
    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}