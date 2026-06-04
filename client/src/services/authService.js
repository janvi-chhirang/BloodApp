import store from '../redux/store';
import { userLogin } from '../redux/features/auth/authAction';
import { toast } from 'react-toastify';
import { userRegister } from '../redux/features/auth/authAction';

export const handleLogin=(e, email, password, role)=>{
    e.preventDefault();
    try{
        if(!email || !password || !role){
            return toast.error('Please fill all the fields')
        }
      store.dispatch(userLogin({email, password, role}));
    }catch(err){
        console.log(err)
    }
}

export const handleRegister=(e, email, password, role, name, organisationName, hospitalName, website, address, phoneNo)=>{
    e.preventDefault();
    try{
       store.dispatch(userRegister({email, password, role, name, organisationName, hospitalName, website, address, phoneNo}));
    }catch(err){
        console.log(err)
    }
}