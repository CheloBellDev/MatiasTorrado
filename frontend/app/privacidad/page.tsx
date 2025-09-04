export const metadata = { title: 'Política de Privacidad' };
export default function Privacidad(){
  return (
    <div className="py-12 max-w-3xl">
      <h1 className="h-sub mb-6">Política de Privacidad</h1>
      <p className="text-muted mb-4">Cuidamos tus datos personales y solo los usamos para brindarte nuestros servicios de nutrición.</p>
      <ul className="list-disc ml-6 text-[16px] leading-7" style={{color:'#dfe8ff'}}>
        <li>Datos recolectados: contacto (nombre, email, teléfono) y turnos.</li>
        <li>Base legal: consentimiento y ejecución del servicio.</li>
        <li>Conservación: el tiempo necesario para la relación profesional y obligaciones legales.</li>
        <li>Derechos: acceso, rectificación, eliminación. Escribinos a <b>contacto@ejemplo.com</b>.</li>
      </ul>
    </div>
  );
}