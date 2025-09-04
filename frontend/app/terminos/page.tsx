export const metadata = { title: 'Términos y Condiciones' };
export default function Terminos(){
  return (
    <div className="py-12 max-w-3xl">
      <h1 className="h-sub mb-6">Términos y Condiciones</h1>
      <p className="text-muted mb-4">Al utilizar este sitio aceptás estos términos. Los servicios brindados no sustituyen la consulta médica.</p>
      <ul className="list-disc ml-6 text-[16px] leading-7" style={{color:'#dfe8ff'}}>
        <li>Las recomendaciones se ajustan a cada persona según su historia clínica.</li>
        <li>Política de cancelaciones y reprogramaciones disponible al agendar.</li>
        <li>Propiedad intelectual: contenidos y marca de Matias Torrado Nutrición.</li>
      </ul>
    </div>
  );
}