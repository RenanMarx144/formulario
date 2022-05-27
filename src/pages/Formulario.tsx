import '../style/formulario.scss';
import { useState } from "react";
import ReactDom from "react-dom";
import { Telefone } from '../components/telefone';
import { type } from 'os';
import { IndexInfo, IndexKind, IndexType } from 'typescript';

type add = {
  value: number
}
export function Formulario() {
  const [counte, setstate] = useState(1)
  const [st, setsst] = useState(-1)
  const [addMore, setAddMore] = useState<add[]>([])
  const [cnpj , setCnpj] = useState('from-group d-none')
  const [cpf , setCpf] = useState('from-group')
  const [left , setLeft] = useState('0%')
  const [color , setColort] = useState('white')
  const [color2 , setColort2] = useState('black')
  var teste = [{ value: 1 }]
  async function addmore(e: any) {
    e.preventDefault()
    for (let index = 0; index < counte; index++) {
      teste[index] = {
        value: index
      }
    }
    await setstate(counte + 1)
    await setAddMore(teste)
    await setsst(st + 1)
    await console.log(st);    
    await console.log(addMore);    

  }
  async function remove(e:any, id: IndexKind) {
    e.preventDefault()
    if (st != (-1)) {
      
      await setsst(st - 1)
      await addMore.splice(id)
      await console.log(addMore);    
      await console.log(st);    
      await setAddMore(addMore)
      await setstate(counte + -1)
    }
  }
  return (
    <div id="form">
      <form>
        <fieldset className="f1">
          <legend>Dados de pré cadastro</legend>
          <div className="from-group">
            <input type="text" placeholder="Nome*" name="nome" />
          </div>
          <div className="from-group">
            <input type="email" placeholder="E-mail*" name="email" />
          </div>
          <div className="from-group">
            <label htmlFor="foto" className='btn-foto'>Foto</label>
            <input type="file" placeholder="Foto" name="email" id="foto" />
          </div>
        </fieldset>
        <fieldset className="f2">
          <legend>Dados Fiscos ou Jurídicos</legend>
          <div className="slide-input">
            <div className="back" style={{left: left}}></div>
            <button className="cpftap"
            onClick={e => { 
              e.preventDefault();
              setCnpj(cnpj => 'from-group d-none')
              setCpf(cpf => 'from-group ')
              setLeft(left => '0%')
              setColort2(color2 => 'black')
              setColort(color => 'white')
            }}style={{color: color}}>CPF</button>
            <button className="cnpjtap" onClick={e => { 
              e.preventDefault();
              setCnpj(cnpj => 'from-group')
              setCpf(cpf => 'from-group d-none')
              setLeft(left => '50%')
              setColort2(color2 => 'white')
              setColort(color => 'black')
            }} style={{color: color2}}>CNPJ</button>
          </div>
          <div className={cpf}>
            <input type="text" placeholder="CPF*" name="cpf" />
          </div>
          <div className={cnpj}>
            <input type="text" placeholder="CNPJ*" name="cpf" />
          </div>
          <div className={cnpj}>
            <input type="text" placeholder="Nome da Empresa" name="empresa" />
          </div>
        </fieldset>
        <fieldset className="f3">
          <legend>Contato</legend>
          <div id="row_tel">
            <div className="from-group_tel tel" date-tel={1}>
              <select name="tipo[]">
                <option value="">Selecione tipo de Número</option>
                <option value="0">Celular</option>
                <option value="1">Telefone</option>
                <option value="2">Empresarial</option>
              </select>
              <input type="tel" placeholder="Telefone" name="tel[]" />
              <input type="tel" placeholder="Ramal" name="ramal[]" id="ramal" />
              <input type="text" placeholder="Nome para contato" name="contato[]" />
              
            </div>
            {
              addMore.map(count => {
                return (
                  <div key={count.value}>
                    <Telefone count={counte} st={counte} />
                  </div>
                )
              })
            }

          </div>
          <div className='adderm'>
          <button className='addmore' onClick={(e) => addmore(e)}>Adicionar Mais +</button>
          <button className='remove' onClick={(event: EventInit) => remove(event,st)}>Remove</button>
          </div>
        </fieldset>
        <fieldset className="f4">
          <legend>Endereço</legend>
          <div className="from-group">
            <input type="text" placeholder="CEP*" name="cep" />
          </div>
          <div className="from-group">
            <input type="text" placeholder="Endereço" name="rua" />
          </div>
          <div className="from-group">
            <input type="text" placeholder="Cidade" name="cidade" />
          </div>
          <div className="from-group">
            <input type="text" placeholder="Estado" name="estado" />
          </div>
          <div className="from-group">
            <input type="text" placeholder="Número" name="numero" />
          </div>
          <div className="from-group">
            <input type="text" placeholder="Complemento" name="complemento" />
          </div>
        </fieldset>
      </form>
    </div>
  )
}