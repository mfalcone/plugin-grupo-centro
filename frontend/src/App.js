import React, { Fragment, useEffect, useState } from 'react';
import { BASEURL } from './lib/baseurl';
import {Especialidades} from './componentes/especialidades';
import './App.scss';

function App() {

  const [especialidades, setEspecialidades] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [especialidadesAMostrar, setEspecialidadesAMostrar] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const getProfecionales = () => {
      fetch(BASEURL + '/wp-json/wp/v2/profesionales?_embed&filter[posts_per_page]=-1', { headers: headers })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setProfesionales(myJson);
        }).catch(function (error) {
          console.log(error);
        })
        ;
    }

    const getEspecialidades = () => {
      fetch(BASEURL + '/wp-json/wp/v2/especialidades?_embed&orderby=slug&order=asc', { headers: headers })
        .then(function (response) {
          return response.json();
        })
        .then(function (myJson) {
          setEspecialidades(myJson);
          getProfecionales()
        }).catch(function (error) {
          console.log(error);
        })
        ;
    }
    getEspecialidades();
    setCargando(true);
  }, [])

  useEffect(() => {
    const armarDatos = () => {
      const especialidadesMostar = [];
      especialidades.map((especialidad, index) => {
        especialidadesMostar.push({
          id: especialidad.id,
          titulo: especialidad.title.rendered,
        });
        const profesionalesAMostrar = []
  
        profesionales.filter((profesional,index) => {
          if (profesional.post_meta_fields._especialidad_field[0] === especialidad.id.toString()) {
            let subespecialidad = '';
            if(profesional.post_meta_fields._subespecialidad_meta_key){
              subespecialidad = profesional.post_meta_fields._subespecialidad_meta_key[0]
            }
            profesionalesAMostrar.push({
              id: profesional.id,
              apellido: profesional.post_meta_fields._apellido_meta_key[0],
              nombre: profesional.post_meta_fields._nombre_meta_key[0],
              matricula: profesional.post_meta_fields._matricula_meta_key[0],
              genero: profesional.post_meta_fields._genero_meta_key[0],
              subespecialidad: subespecialidad,
            })
            if(profesional._embedded){
              profesionalesAMostrar[index].imagen = profesional._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url;
            }
          }
          return profesionalesAMostrar;
        })
        especialidadesMostar[index].profesionales = profesionalesAMostrar;
  
        return null;
      })
      setEspecialidadesAMostrar(especialidadesMostar);
    }
    if(profesionales.length > 0 && especialidades.length > 0){  
      armarDatos()
    }
  }, [profesionales, especialidades])

  useEffect(() => {
    if (especialidadesAMostrar.length > 0) {
      setCargando(false);
    }
  }, [especialidadesAMostrar])

  return (
    <Fragment>
      {cargando && <div className="container text-center cargando">Cargando...</div>}
      {especialidadesAMostrar.length > 0 && <Especialidades especialidades={especialidadesAMostrar}/>}
    </Fragment>
  );
}

export default App;
