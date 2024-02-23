"use client"
import { toast, Toaster } from 'react-hot-toast';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const page = () => {
  const router = useRouter();
  const [user, setUser] = useState();

  const syncUserData = async () => {
    try {
      const result = await axios.get('/api/v1/users/data');
      if (result.status === 200) {
        setUser(result.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(()=> {
    syncUserData();
  },[]);

  const logout = async () => {
    try {
      await axios.get('/api/v1/users/logout');
      toast.success('Logout success');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      <h1>Profile page</h1>
      <Button type="button" onClick={logout}>Logout</Button>
    </div>
  )
}

export default page
