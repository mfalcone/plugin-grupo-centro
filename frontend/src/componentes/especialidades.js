import React, { Fragment, useEffect, useState } from 'react';
import { Profesional } from './profesional';
import { Accordion, Alert } from 'react-bootstrap';
import { Buscador } from './buscador';
import { Plus, Dash } from 'react-bootstrap-icons';

export const Especialidades = ({ especialidades }) => {
    const [activo, setActivo] = useState(null);
    const [especialidadFiltrada, setEspecialidadFiltrada] = useState([]);
    const [especialidadesAMostrar, setEspecialidadesAMostrar] = useState(especialidades);
    const [profesionalSeleccionado, setProfesionalSeleccionado] = useState(null);

    const buscarEspecialidad = (especialidad) => {
        setEspecialidadFiltrada(especialidades.filter(e => e.titulo === especialidad));
        setActivo(0);
    }

    const buscarProfesional = (profesional) => {
        setEspecialidadFiltrada(especialidades.filter(e => e.profesionales.filter(p => p.apellido === profesional).length > 0));
        setActivo(0);
        setProfesionalSeleccionado(profesional)
    }

    const limpiarFiltrado = () => {
        setEspecialidadFiltrada([]);
        setEspecialidadesAMostrar(especialidades);
        setActivo(null);
        setProfesionalSeleccionado(null);
    }

    useEffect(() => {
        if (especialidadFiltrada.length > 0) {
            setEspecialidadesAMostrar(especialidadFiltrada);
        }
    }, [especialidadFiltrada])

   const abrirCerrar = (index, especialidadId) => {
        if (activo === index) {
            setActivo(null);
        } else {
            setActivo(index);
            setTimeout(function(){
                window.location.href = "#prof"+especialidadId
            },400);
        }
    }

    return (
        <Fragment>
            <div className="container pt-2 fusion-accordian">
                <Alert variant="dark" style={{opacity:"1"}}>
                    <Buscador especialidades={especialidades} buscarEspecialidad={buscarEspecialidad} limpiarFiltrado={limpiarFiltrado} buscarProfesional={buscarProfesional} />
                </Alert>
                <Accordion activeKey={activo} flush>
                    {especialidadesAMostrar.map((especialidad, index) => {
                        return (<Accordion.Item eventKey={index} key={especialidad.id}><div className="row">
                            <Accordion.Header onClick={() => {abrirCerrar(index, especialidad.id)}}>
                            <div className="ancla" id={'prof'+especialidad.id} ></div>
                            <h4 className="panel-title toggle">
                           {(activo === index)?(<Dash />):(<Plus />)} 
                            <span className="fusion-toggle-heading">{especialidad.titulo}</span>
                            </h4>
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="fusion-flip-boxes flip-boxes row fusion-columns-4 flip-effect-3d equal-heights">
                                    {especialidad.profesionales.map((profesional, index) => {
                                        return (
                                            <div className="col-12 col-md-3" key={profesional.id}><Profesional profesional={profesional} profesionalSeleccionado={profesionalSeleccionado} /></div>
                                        )
                                    })}
                                    {especialidad.profesionales.length === 0 && <div className="col-12">No hay profesionales para esta especialidad</div>}
                                </div>
                            </Accordion.Body>
                        </div></Accordion.Item>)
                    })
                    }
                </Accordion>
            </div>
        </Fragment>
    );
};
