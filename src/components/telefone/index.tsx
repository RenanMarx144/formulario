import { type } from '@testing-library/user-event/dist/type';
import InputMask from "react-input-mask";
import './style.scss';

type TelProps = {
  count: Number;
  st?: Number;
  value: {};
  onChange?: any
}
export function Telefone(props: TelProps) {
  function remove(e:any, id: any) {
    e.preventDefault()
    console.log(id);
    
    
  }
  return (
    <div className="from-group_tel tel" data-tel={props.count}>
      <select name="tipo[]">
        <option value="">Tipo de Número</option>
        <option value="0">Celular</option>
        <option value="1">Telefone</option>
        <option value="2">Empresarial</option>
      </select>
      <InputMask mask="(99) 99999-9999" type="tel" placeholder="Telefone" name="tel[]" />
      <input type="tel" placeholder="Ramal" name="ramal[]" id="ramal" />
      <input type="text" placeholder="Nome para contato" name="contato[]" />

    </div>
  )
}