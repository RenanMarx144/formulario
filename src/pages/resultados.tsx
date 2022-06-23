import React, { Key, useEffect, useState } from "react";
import { useNavigate} from "react-router";
import { Link, To } from "react-router-dom";
import Swal from 'sweetalert2'
import { get, ref, db, onValue, onChildRemoved, remove } from "../services/firebase";
import "../style/resultados.scss";
export function Resultados() {
  var navegate = useNavigate();
  
  var repId: any
  function remover(id: any) {
    console.log(id);
    const commentsRef = ref(db, 'users/' + id);
    Swal.fire({
      title: 'Deletar',
      text: "Deseja Realmente Deletar esses Dados?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, delete Isso!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        remove(commentsRef).then(() => {
          Swal.fire({
            title: 'Deletado!',
            text: 'Formulário Deletado',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            window.location.reload()
            // navegate('/resultados')
          })
        })
      }

    })

  }
  const [formularios, setFormularios] = useState([])
  var etc: any = Array()
  const postListRef = ref(db, 'users')
  useEffect(() => {
    return () => {
      onValue(postListRef, (res) => {
        var cont = 0
        res.forEach((children) => {
          const key: any = children.key
          etc[cont] = children.val()
          cont++
        })
        setFormularios(etc)
      })
      console.log(formularios);
    }
  }, [])

  return (
    <div id="page">
      <div className="rollback">
        <Link to="/">Voltar</Link>
      </div>
      <ul className="ded">
        {formularios.map((value: any) => {
          return (
            <li key={value.useCPF ? value.useCPF : value.useCNPJ}>
              <ul className="child">
                <li>Nome: {value.useName}</li>
                <li>E-mail: {value.useEmail}</li>
                {value.useCPF && <li>CPF: {value.useCPF}</li>}
                {value.useCNPJ && <li>CNPJ: {value.useCNPJ}</li>}
                {value.empresa && <li>Empresa: {value.empresa}</li>}
                {value.tipo && <li>Tipo: {value.tipo}</li>}
                {value.numTel && <li>Número: {value.numTel}</li>}
                {value.ramal && <li>Ramal: {value.ramal}</li>}
                {value.contato && <li>Contato: {value.contato}</li>}
                {value.cep && <li>CEP: {value.cep}</li>}
                {value.city && <li>Cidade: {value.city}</li>}
                {value.neighborhood && <li>Bairro: {value.neighborhood}</li>}
                {value.state && <li>UF: {value.state}</li>}
                {value.street && <li>Rua:{value.street}</li>}
                {value.numero && <li>Número: {value.numero}</li>}
                {value.obs && <li className="obs">Obs: {value.obs}</li>}
                <li className="delete"><button onClick={(id: any) => remover(id = value.useCPF ? value.useCPF : value.useCNPJ)}>Deletar </button></li>
                <li></li>
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}