import '../style/home.scss';
import homeAside from "../assets/img/home-aside.webp";
import logo from "../assets/img/logo.png";
import { Button } from '../components/Button';
import { useLocation , useNavigate } from "react-router-dom";
export function Home() {
  const navegate = useNavigate();
  function formulario() {
    navegate('/formulario')
  }
  return(
    <div id="home">
      <aside>
        <img src={homeAside} alt="" />
        <div className="content">
        <strong>Formulário React com TypeScript</strong>
        <p>O intuíto desse projeto apresentar um formulário basico com mascaras e validações.
        Sempre que tenho uma entrevista vejo que os teste principais para front-end é a criação
        de um formúlario, então resolvi criar um prejeto em React já aprensetando essa habilidade.
        </p>
        <p>Tel: 11 98158-9854</p>
        <p>Zap: 11 96526-5705</p>
        </div>
      </aside>
      <main>
        <div className='home-main'>
          <img src={logo} alt="" />
          <div className="cad">
            <button onClick={formulario} className='btn-form'>Formulário</button>
            <hr />
            <div className="outline"><p>ou veja o resultados gerados pelo formulário</p></div>
            <Button className='btn-result' onClick={() => {navegate('/resultados')}}>Resultados</Button>
          </div>
        </div>
      </main>
    </div>
  )
}