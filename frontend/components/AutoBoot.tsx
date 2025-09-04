'use client'
import { useEffect } from 'react'
import { bootAuth } from '../lib/auth'
export default function AuthBoot(){
  useEffect(() => { bootAuth(); }, []);
  return null;
}