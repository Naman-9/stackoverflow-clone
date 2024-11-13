"use client";

import { useAuthStore } from '@/store/Auth';
import React from 'react';

const LoginPage = () => {
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // collect data
    const formData = new FormData(e.currentTarget);
    
    const email = formData.get('email');
    const password = formData.get('password');

    // validate data
    if (!email || !password) {
      setError(() => 'Please fill all fields.');
      return;
    }

    // handle loading and errors
    setIsLoading(() => true);
    setError(() => '');

    // login -> store
    const loginResponse = await login(email.toString(), password.toString());

    if (loginResponse.error) {
      setError(() => loginResponse.error!.message);
    }
    setIsLoading(() => false);
  };

  return <div>LoginPage</div>;
};

export default LoginPage;
