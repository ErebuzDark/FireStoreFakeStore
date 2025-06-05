import React, { useState } from 'react';
import { Context } from '@contexts/ContextProvider';
// components
import LoginForm from '@features/components/LoginForm';
import SignUp from '@features/components/SignUp';

const LoginPage = () => {
  const [form, setForm] = useState('login');

  return (
    <div className='size-full flex flex-col items-center justify-center bg-cover bg-center' style={{backgroundImage: 'url(fireLoginPageBG.svg)'}}>
      <div className='w-full max-w-sm'>
        {form === 'login' ? <LoginForm setForm={setForm} /> : <SignUp setForm={setForm}/>}
      </div>
    </div>
  );
}

export default LoginPage;
