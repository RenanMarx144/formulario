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
        <strong>Formulário React de apresentação de habilidades</strong>
        <p>o intuíto desse projeto apresentar um formulário basico com mascaras e validações.
        Sempre que tenho uma entrevista vejo que os teste principalemente para front end é a criação
        de um formúlario então resolvi criar um prejeto em react já aprensetando essa habilidade
        </p>
        </div>
      </aside>
      <main>
        <div className='home-main'>
          <img src={logo} alt="" />
          <div className="cad">
            <button onClick={formulario} className='btn-form'>Formulário</button>
            <hr />
            <div className="outline"><p>ou veja o resultados gerados pelo formulário</p></div>
            <Button className='btn-result'>Resultados</Button>
          </div>
        </div>
      </main>
    </div>
  )
}