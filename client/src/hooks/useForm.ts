import { useState } from 'react';
import axios from 'axios';

const useForm = (validate: any) => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [name]: value,
    //   })
    // );
  };

  const handleSubmit = async(e: React.SyntheticEvent) => {
    e.preventDefault();
    // setErrors(validate(values));
  
    if(Object.keys(errors).length === 0) {
      // const data = await axios.post('http://localhost:5000/api/user/signUp', values)
      console.log(errors)
      // alert('heya')
    }
    console.log(errors)
  };

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;