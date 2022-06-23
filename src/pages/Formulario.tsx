import '../style/formulario.scss';
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Telefone } from '../components/telefone';
import { IndexKind } from 'typescript';
import InputMask from "react-input-mask";
import { db, ref, set, get } from "../services/firebase";
import cep from 'cep-promise'
import Swal from 'sweetalert2'

type add = {
  id: number,
  tipo: any,
  numTel: String,
  ramal: String,
  contato: String,
}
type endereco = {
  city: String,
  neighborhood: String,
  state: String,
  street: String
}

export function Formulario() {
  function validarCNPJ(cnpj: any) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
      return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999")
      return false;

    // Valida DVs
    var tamanho = cnpj.length - 2
    var numeros = cnpj.substring(0, tamanho);
    var digitos = cnpj.substring(tamanho);
    var soma = 0;
    var pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
      return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (var i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
        pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
      return false;

    return true;
  }
  function isValidCPF(cpf: string) {
    if (typeof cpf !== "string") return false
    cpf = cpf.replace(/[\s.-]*/igm, '')
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false
    }
    var soma = 0
    var resto
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(9, 10))) return false
    soma = 0
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i)
    resto = (soma * 10) % 11
    if ((resto == 10) || (resto == 11)) resto = 0
    if (resto != parseInt(cpf.substring(10, 11))) return false
    return true
  }
  const [endereco, setEndereco] = useState<endereco>(
    {
      city: '',
      neighborhood: '',
      state: '',
      street: ''
    }
  )



  function useForm(initValues: {}, tels: {}) {
    const [values, setValues] = useState(initValues)
    const [valuess, setValuess] = useState(tels)
    function handcheng(e: React.ChangeEvent<HTMLInputElement>) {
      const filedName: any = e.target.getAttribute('name')
      setValues(
        {
          ...values,
          [filedName]: e.target.value
        }
      )
      console.log(values);


    }
    function handchengTel(e: React.ChangeEvent<HTMLInputElement>) {
      const filedName: any = e.target.getAttribute('name')
      setValuess(
        {
          ...valuess,
          [filedName]: e.target.value

        }
      )
      console.log(valuess);
    }
    return {
      values, handcheng, handchengTel, valuess
    }

  }

  const form: any = useForm({
    initValues: {
      useName: '',
      useCPF: '',
      useCNPJ: '',
      useEmpresa: '',
      city: '',
      street: '',
      state: '',
      complemento: '',
      numero: '',
      neighborhood: '',
      cep: '',
      useEmail: '',
      obs: ''
    }
  }, {
    tels: {
      id: 0,
      tipo: '',
      numTel: '',
      ramal: '',
      contato: '',
    }
  })

  async function cepChange(e: React.ChangeEvent<HTMLInputElement>) {
    form.values.cep = e.target.value
    var unmask = e.target.value
    var cp = unmask.replace(/[^0-9]/g, '')
    if (cp.length > 7) {
      await cep(cp).then((values: any) => {
        console.log(values);
        setEndereco({
          city: values.city,
          neighborhood: values.neighborhood,
          state: values.state,
          street: values.street
        })
        // document.querySelector('#complemento').

        form.values.city = values.city.toString()
        form.values.neighborhood = values.neighborhood.toString()
        form.values.state = values.state.toString()
        form.values.street = values.street.toString()
      });
      // console.log(endereco);
    }

  }
  const [errors, setErrors] = useState({
    useName: '',
    useCPF: '',
    useCNPJ: '',
    useEmail: ''
  })

  var validateTrue: boolean = true
  function validate(values: any) {

    validateTrue = true
    var errors = {
      useName: '',
      useCPF: '',
      useCNPJ: '',
      useEmail: ''
    }
    if (values.useCPF != undefined) {
      values.useCPF = values.useCPF != '' ? values.useCPF.replace(/[^0-9]/g, '') : ''
    }
    if (values.useCNPJ != undefined) {
      values.useCNPJ = values.useCNPJ != '' ? values.useCNPJ.replace(/[^0-9]/g, '') : ''
    }
    // console.log(values);

    if (values.useName == '' || values.useName == undefined) {
      validateTrue = false
      errors.useName = 'Campo Obrigatório'
    }

    if (values.useEmail == '' || values.useEmail == undefined) {
      validateTrue = false
      errors.useEmail = 'Campo Obrigatório'
    }
    if (values.useCPF == '' || values.useCPF == undefined) {
      if (values.useCNPJ == undefined || values.useCNPJ == '') {
        errors.useCPF = 'Campo Obrigatório'
        validateTrue = false
      }
    }
    if (values.useCNPJ == '' || values.useCNPJ == undefined) {
      if (values.useCPF === '' || values.useCPF === undefined) {
        errors.useCNPJ = 'Campo Obrigatório'
        validateTrue = false
      }
    }

    if (values.useEmail != undefined) {
      if (!values.useEmail.includes('@')) {
        errors.useEmail = 'E-mail Inválido'
        validateTrue = false
      }
    }

    if (values.useCPF != undefined && values.useCPF != '') {
      if (!isValidCPF(values.useCPF)) {
        errors.useCPF = 'CPF Inválido'
        validateTrue = false
      }


    }
    if (values.useCNPJ != undefined && values.useCNPJ != '') {
      if (!validarCNPJ(values.useCNPJ)) {
        errors.useCNPJ = 'CNPJ Inválido'
        validateTrue = false
      }
    }


    return errors
  }

  const [tels, setTels] = useState<add[]>([])
  const [counte, setstate] = useState(tels.length+1)
  const [st, setsst] = useState(0)
  const [cnpj, setCnpj] = useState('from-group d-none')
  const [cpf, setCpf] = useState('from-group')
  const [left, setLeft] = useState('0%')
  const [color, setColort] = useState('white')
  const [color2, setColort2] = useState('black')
  var tel = [{
    id: 0,
    tipo: '',
    numTel: '',
    ramal: '',
    contato: '',
  }]
  async function addmore(e: any) {
    e.preventDefault()
    setstate(counte + 1)
    setsst(st + 1)
    for (let index = 0; index < counte; index++) {
      tel[index] = {
        id: index,
        tipo: '',
        numTel: '',
        ramal: '',
        contato: '',
      }
    }
    setTels(tel)
    // await console.log(st);
    // await console.log(addMore);

  }
  async function remove(e: any, id: IndexKind) {
    e.preventDefault()
    if (st != (-1)) {

      await setsst(st - 1)
      await tels.splice(id)
      // await console.log(addMore);
      // await console.log(st);
      await setTels(tels)
      await setstate(counte + -1)
    }
  }
  var navegate = useNavigate();

  function handleSaveForm(event: FormEvent) {
    event.preventDefault()

    console.log(form);

    setErrors(validate(form.values))

    if (validateTrue) {
      var email = 'asdasd'
      var imageUrl = 'asdasd'
      var userId: any, rp: String
      delete form.values.initValues
      delete form.valuess.tels
      console.log(form.values);
      if (form.values.useCPF != undefined && form.values.useCPF != '') {
        delete form.values.useEmpresa
        delete form.values.useCNPJ
        userId = form.values.useCPF
        rp = 'CPF'
      } 
      if(form.values.useCNPJ != undefined && form.values.useCNPJ != '') {
        userId = form.values.useCNPJ
        rp = 'CNPJ'
        delete form.values.useCPF
      }
      get(ref(db, 'users/' + userId)).then((result) => {
        if (result.exists()) {
          var errorss: any = { ...errors };
          errorss.useCPF = rp + ' já Cadastrado'
          validateTrue = false
          console.log(errorss);
          setErrors(errorss);
          Swal.fire({
            title: 'Erro!',
            text: rp + ' já Cadastrado',
            icon: 'error',
            confirmButtonText: 'Sim'
          }).then(() => {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }, 300);
          })
        } else {

          set(ref(db, 'users/' + userId), {
            ...form.values,
            ...form.valuess
            // profile_picture : imageUrl
          }).then(() => {
            Swal.fire({
              title: 'Enviado!',
              text: 'Formulário Cadastrado',
              icon: 'success',
              confirmButtonText: 'OK'
            }).then(() => {
              navegate('/')
            })
          })
        }
      });
    } else {
      Swal.fire({
        title: 'Erro!',
        text: 'Verifique os campos novamente e preencha corretamente',
        icon: 'error',
        confirmButtonText: 'Sim'
      }).then(() => {
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" })
        }, 300);
      })
    }
  }
  return (
    <div id="form">
      <form method='POST' onSubmit={handleSaveForm}>
        <fieldset className="f1">
          <legend>Dados de pré cadastro</legend>
          <div className="from-group">
            <input type="text" id='useName' placeholder="Nome*" name="useName" value={form.values.useName} onChange={form.handcheng} />
            {errors.useName != '' ? <span className='span'>{errors.useName}</span> : ''}
          </div>
          <div className="from-group">
            <input type="email" id='useEmail' placeholder="E-mail*" name="useEmail" value={form.values.useEmail} onChange={form.handcheng} />
            {errors.useEmail != '' ? <span className='span'>{errors.useEmail}</span> : ''}
          </div>

        </fieldset>
        <fieldset className="f2">
          <legend>Dados Fiscos ou Jurídicos</legend>
          <div className="slide-input">
            <div className="back" style={{ left: left }}></div>
            <button className="cpftap"
              onClick={e => {
                e.preventDefault();
                setCnpj(cnpj => 'from-group d-none')
                setCpf(cpf => 'from-group ')
                setLeft(left => '0%')
                setColort2(color2 => 'black')
                setColort(color => 'white')
              }} style={{ color: color }}>CPF</button>
            <button className="cnpjtap" onClick={e => {
              e.preventDefault();
              setCnpj(cnpj => 'from-group')
              setCpf(cpf => 'from-group d-none')
              setLeft(left => '50%')
              setColort2(color2 => 'white')
              setColort(color => 'black')
            }} style={{ color: color2 }}>CNPJ</button>
          </div>
          <div className={cpf}>
            <InputMask mask="999.999.999-99" type="text" placeholder="CPF*" name="useCPF" id='cpf' value={form.values.useCPF} onChange={form.handcheng} />
            {errors.useCPF != '' ? <span className='span'>{errors.useCPF}</span> : ''}
          </div>
          <div className={cnpj}>
            <InputMask mask="99.999.999/9999-99" type="text" placeholder="CNPJ*" name="useCNPJ" id='cnpj' value={form.values.useCNPJ} onChange={form.handcheng} />
            {errors.useCNPJ != '' ? <span className='span'>{errors.useCNPJ}</span> : ''}
          </div>
          <div className={cnpj}>
            <input type="text" placeholder="Nome da Empresa" name="useEmpresa" value={form.values.useEmpresa} onChange={form.handcheng} />
          </div>
        </fieldset>
        <fieldset className="f3">
          <legend>Contato</legend>
          <div id="row_tel">
            <div className="from-group_tel tel" date-tel={1}>
              <select name="tipo" onChange={form.handchengTel}>
                <option value="">Tipo de Número</option>
                <option value="Celular">Celular</option>
                <option value="Telefone">Telefone</option>
                <option value="Empresarial">Empresarial</option>
              </select>
              <InputMask mask="(99) 99999-9999" type="tel" name="numTel" placeholder="Telefone" value={form.values.tels?.numTel} onChange={form.handchengTel} />
              <input type="tel" placeholder="Ramal" name="ramal" id="ramal" value={form.values.tels?.ramal} onChange={form.handchengTel} />
              <input type="text" placeholder="Nome para contato" name="contato" value={form.values.tels?.contato} onChange={form.handchengTel} />

            </div>
            {
              tels.map(count => {
                return (
                  <div key={count.id}>
                    <Telefone count={counte} st={counte} value={tels} />
                  </div>
                )
              })
            }

          </div>
          {/* <div className='adderm'>
            <button className='addmore' onClick={(e) => addmore(e)}>Adicionar Mais +</button>
            <button className='remove' onClick={(event: EventInit) => remove(event, st)}>Remove</button>
          </div> */}
        </fieldset>
        <fieldset className="f4">
          <legend>Endereço</legend>
          <div className="from-group">
            <div className="d-flex">
              <InputMask mask="99999-999" type="text" placeholder="CEP*" name="cep" id='cep' value={form.values.cep} onChange={cepChange} />
              <input type="text" placeholder="Cidade" name="cidade" id='city' value={form.values.city} onChange={form.handcheng} />
              <input type="text" placeholder="Estado" name="estado" id='state' value={form.values.state} onChange={form.handcheng} />
            </div>
          </div>
          <div className="from-group">
            <input type="text" placeholder="Endereço" name="rua" id='street' value={form.values.street} onChange={form.handcheng} />
          </div>
          <div className="from-group">
            <div className="d-flex">
              <input type="text" placeholder="Bairro" name="bairro" id='neighborhood' value={form.values.neighborhood} onChange={form.handcheng} />
              <input type="text" placeholder="Número" name="numero" id='num' value={form.values.numero} onChange={form.handcheng} />
              <input type="text" placeholder="Complemento" name="complemento" id='complemento' value={form.values.complemento} onChange={form.handcheng} />
            </div>
          </div>

        </fieldset>
        <fieldset className='f4'>
          <legend>
            Feedback
          </legend>
          <div className="from-group">
            <textarea name="obs" id="obs" placeholder='
              Deixe um comentário sobre o que achou do app, sugestões entre ourtos. 
              Se for um Recrutador e ficou intereçado deixe seu contato para que eu possra retorna
              ' onChange={form.handcheng} value={form.values.obs} ></textarea>
          </div>
        </fieldset>
        <div className='d-flex'>
          <button type='submit' className='enviar'>Enviar</button>
        </div>
      </form>
    </div>
  )
}