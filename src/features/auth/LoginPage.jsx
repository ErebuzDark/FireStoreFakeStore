import React from 'react';
import { Context } from '@contexts/ContextProvider';
// components
import LoginForm from '@features/components/LoginForm';

const LoginPage = () => {
  return (
    <div className='size-full flex flex-col items-center justify-center bg-cover bg-center' style={{backgroundImage: 'url(fireLoginPageBG.svg)'}}>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
