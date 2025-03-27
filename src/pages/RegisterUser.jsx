import { useState } from 'react';

const RegisterUser = () => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm();

    const [serverMessage, serServerMessage] = useState("")

    
}