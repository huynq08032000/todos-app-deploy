const validateString = (value) =>{
    if (!value.trim()){
        return "Invalid input";
    } 
    return ''
}
export const validateForm = (formValue) => {
    return {
        nameErr : validateString(formValue.name),
        desErr : validateString(formValue.des)
    }
}
export const validForm = (value) =>{
    return !value.nameErr && !value.desErr
}