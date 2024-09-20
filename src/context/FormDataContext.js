import React, { createContext, useContext, useState } from "react";

const FormDataContext = createContext();

export const useFormData = () => useContext(FormDataContext);

const FormDataProvider = ({children})=>{
    const  [formState, setFormState] = useState({});

    const updateFormState = (newData) =>{
        setFormState(newData)
    }

    return (
        <FormDataContext.Provider value = {{formState,updateFormState}}>
            {children}
        </FormDataContext.Provider>
    )
}

export default FormDataProvider;