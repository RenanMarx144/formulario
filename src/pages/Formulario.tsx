import '../style/formulario.scss';
import React, { useState } from "react";
import ReactDom from "react-dom";
export function Formulario() {
  const [count, setstate] = useState(2)
  function addmore(e: any) {
    e.preventDefault()
    let row_tel = document.getElementById('row_tel');
    setstate(count +1)
    const content = React.createElement(
      'div' , { className: `from-group_tel tel_${count}` },
        React.createElement('select', {name: 'tipo[]' } , 
          React.createElement('option',{value: ''}, 'Selecione tipo de Número'),
          React.createElement('option',{value: '0'}, 'Celular'),
          React.createElement('option',{value: '1'}, 'Telefone'),
          React.createElement('option',{value: '2'}, 'Empresarial'),
        ),
        React.createElement('input' , { type: 'tel' , placeholder:'Telefone', name:'tel[]' }),
        React.createElement('input' , { type: 'tel' , placeholder:'Ramal', name:'ramal[]' }),
        React.createElement('input' , { type: 'text' , placeholder:'Nome para contato', name:'contato[]' })
      )
      ReactDom.render(content, row_tel);
  }
  const eventDirect = {
    new (type: string, event?: EventInit | undefined){
      var event = event
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
            <button className="cpftap">CPF</button>
            <button className="cnpjtap">CNPJ</button>
            <div className="back"></div>
          </div>
          <div className="from-group">
            <input type="text" placeholder="CPF*" name="cpf" />
          </div>
          <div className="from-group d-none">
            <input type="text" placeholder="CNPJ*" name="cpf" />
          </div>
          <div className="from-group d-none">
            <input type="text" placeholder="Nome da Empresa" name="empresa" />
          </div>
        </fieldset>
        <fieldset className="f3">
          <legend>Contato</legend>
          <div id="row_tel">
            <input type="hidden" id="count_tel" value={count} />
            <div className="from-group_tel tel_1">
              <select name="tipo[]">
                <option value="">Selecione tipo de Número</option>
                <option value="">Celular</option>
                <option value="">Telefone</option>
                <option value="">Empresarial</option>
              </select>
              <input type="tel" placeholder="Telefone" name="tel[]" />
              <input type="tel" placeholder="Ramal" name="ramal[]" id="ramal" />
              <input type="text" placeholder="Nome para contato" name="contato[]" />
            </div>
          </div>
          <button className='addmore' onClick={(e) => addmore(e)}>Adicionar Mais +</button>
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