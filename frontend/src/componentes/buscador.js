import React, { useState, useEffect } from 'react';
import Autocomplete from 'react-autocomplete';

export const Buscador = ({ especialidades, buscarEspecialidad,limpiarFiltrado, buscarProfesional }) => {
    const [especialidadvalue, setEspecialidadValue] = useState('');
    const [profesionalvalue, setProfesionalValue] = useState('');
    const [profesionales, setProfesionales] = useState([]);
    const [filtro, setFiltro] = useState(null);

    useEffect(() => {
        const prof = [];
        especialidades.forEach(especialidad => {
            especialidad.profesionales.forEach(profesional => {
                prof.push(profesional);
            });
        });
        setProfesionales(prof);
    }, []);

    const estilos = {
        zIndex: '9999',
        position: 'absolute',
        top: '38px',
        left: '12px',
        right: '0',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        maxHeight: '300px',
        padding: '0',
        width: '100px'
    }

    const seleccionarFiltro = (e) => {
        setFiltro(e.target.value)
    }

    const borrarFiltro = () => {
        setFiltro(null);
        setEspecialidadValue('');
        setProfesionalValue('');
        document.getElementById('selectFilter').value = '';
        limpiarFiltrado();
    }

    const seleccionarProfesional = (profesional) => {
        const apellidoProfesional = profesional.split(',')[0];
        buscarProfesional(apellidoProfesional)
    }

    return (
        <div className="row buscador" id="buscador">
            <div className="col-12 col-md-10">
                <div className="row">
                    <div className="col-4 col-md-auto">
                        <label style={{marginTop:"12px"}}>Buscar por:</label>
                    </div>
                    <div className="col-8 col-md-auto">
                        <select id="selectFilter" className="form-select" onChange={seleccionarFiltro} defaultValue="">
                            <option value="">Seleccione...</option>
                            <option value="E">Especialidad</option>
                            <option value="P">Profesional</option>
                        </select>
                    </div>
                    {filtro === 'E' && <div className="col-12 col-md-auto position-relative autocomplete">
                        <Autocomplete
                            className="form-control"
                            menuStyle={estilos}
                            inputProps={{ placeholder: "buscar especialidad", className: "form-control" }}
                            getItemValue={(item) => item.titulo}
                            items={especialidades}
                            shouldItemRender={(item, value) => item.titulo.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            renderItem={(item, isHighlighted) =>
                                <div className="opciones" key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.titulo}
                                </div>
                            }
                            value={especialidadvalue}
                            onChange={(e) => setEspecialidadValue(e.target.value)}
                            onSelect={(val) => setEspecialidadValue(val)}
                        />
                        {especialidadvalue !== '' && <button type="button" className="btn btn-light ms-2 mb-1" onClick={(e) => {buscarEspecialidad(especialidadvalue)}}>Buscar Especialidad</button>}
                    </div>}
                    {filtro === 'P' && <div className="col-12 col-md-auto position-relative  autocomplete">
                        <Autocomplete
                            menuStyle={estilos}
                            inputProps={{ placeholder: "buscar profesional", className: "form-control" }}
                            getItemValue={(item) => item.apellido + ', ' + item.nombre}
                            items={profesionales}
                            shouldItemRender={(item, value) => item.apellido.toLowerCase().indexOf(value.toLowerCase()) > -1}
                            renderItem={(item, isHighlighted) =>
                                <div className="opciones" key={item.id} style={{ background: isHighlighted ? 'lightgray' : 'white' }}>
                                    {item.apellido}, {item.nombre}
                                </div>
                            }
                            value={profesionalvalue}
                            onChange={(e) => setProfesionalValue(e.target.value)}
                            onSelect={(val) => setProfesionalValue(val)}
                        />
                        {profesionalvalue !== '' && <button type="button" className="btn btn-light ms-2 mb-1" onClick={(e) => {seleccionarProfesional(profesionalvalue)}}>Buscar Profesional</button>}
                    </div>}
                </div>
            </div>
            <div className="col-md-2 text-end">
                {(profesionalvalue !== '' || especialidadvalue !== '') && <button type="button" className="btn btn-light ms-2 mb-1" onClick ={borrarFiltro}>Borrar Filtro</button>}
            </div>
        </div>
    );
};
