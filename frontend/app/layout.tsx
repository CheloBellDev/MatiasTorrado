import "./globals.css";
import NavBar from "../components/NavBar";
import AuthBoot from "../components/AutoBoot";

export const metadata = { title: "Matias Torrado Nutricion", description: "Nutrición de alto rendimiento" };

export default function RootLayout({ children }: { children: React.ReactNode }){
  return (
    <html lang="es">
      <body>
        <AuthBoot />
        <NavBar />
        <main className="container">{children}</main>
        <footer className="border-t border-line mt-20">
          <div className="container py-10 text-sm" style={{color:'rgba(255,255,255,.8)'}}>
            © {new Date().getFullYear()} Matias Torrado Nutricion
          </div>
        </footer>
        <script dangerouslySetInnerHTML={{__html:`
          const io = new IntersectionObserver((es)=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible'); io.unobserve(e.target);}}),{threshold:.18});
          document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
        `}} />
      </body>
    </html>
  );
}
