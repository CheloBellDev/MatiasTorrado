import { redirect } from 'next/navigation';
export default function Page(){
  // Mantener una sola ruta canónica de login en "/login"
  redirect('/login');
}