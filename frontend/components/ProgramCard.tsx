import Reveal from './Reveal';

type Props = {
  title: string;
  description: string;
  price?: string;
  highlights?: string[];
};

export function ProgramCard({ title, description, price, highlights = [] }: Props){
  return (
    <Reveal>
      <article className="card">
        <div className="badge mb-3">Programa</div>
        <h3 className="uppercase tracking-wide text-2xl mb-2">{title}</h3>
        <p className="mb-4 text-[16px] leading-7" style={{color:'#415a86'}}>{description}</p>
        {highlights.length>0 && (
          <ul className="list-disc ml-6 mb-4 text-[15px] leading-7" style={{color:'#4a5f87'}}>
            {highlights.map((h)=> <li key={h}>{h}</li>)}
          </ul>
        )}
        {price && <p className="text-[18px] font-bold">{price}</p>}
      </article>
    </Reveal>
  );
}