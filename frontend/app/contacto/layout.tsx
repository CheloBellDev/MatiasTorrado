export const metadata = { title: 'Contacto — Matias Torrado Nutricion' };
export default function ContactoLayout({ children }: { children: React.ReactNode }){
  // Usar layout raíz (NavBar, footer, estilos) y evitar duplicados aquí
  return <>{children}</>;
}