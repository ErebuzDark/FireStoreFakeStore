import React from 'react';

// components
import LoginForm from '@features/components/LoginForm';

const LoginPage = () => {
  return (
    <div className='size-full flex flex-col items-center justify-center'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
