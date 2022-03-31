import React, { useState, useEffect } from 'react';
import { BASEURL } from '../lib/baseurl';
import ReactCardFlip from 'react-card-flip';


export const Profesional = ({ profesional, profesionalSeleccionado }) => {

    const [imagen, setImagen] = useState('');
    const [flipped, setFlipped] = useState(false);
    useEffect(() => {

        if (profesional.imagen) {
            setImagen(profesional.imagen);
        } else {
            if (profesional.genero === 'Masculino') {
                setImagen(BASEURL + '/wp-content/plugins/profesionales/doc_m.png');
            } else {
                setImagen(BASEURL + '/wp-content/plugins/profesionales/doc_f.png');
            }
        }

       
    }, [])

   
    const changeFlip = (e) => {
        setFlipped(!flipped);
        if(!flipped){
            e.target.parentElement.parentElement.parentElement.querySelector('.react-card-back').classList.add('flipped');
        }else{
            e.target.parentElement.parentElement.parentElement.querySelector('.react-card-back').classList.remove('flipped');
        }
    }

    return (
        <div>
            <ReactCardFlip isFlipped={flipped} flipDirection="horizontal" flipSpeedFrontToBack="0.3">
                <div className={"flip-box-front" + ((profesionalSeleccionado && profesional.apellido === profesionalSeleccionado) ? ' selected' : '')} style={{
                    backgroundColor: "rgb(247, 247, 247)", borderRadius: "6px", transitionDuration: "0.5s"
                }} >
                    <div className="flip-box-front-inner">
                        <div className="flip-box-grafix flip-box-image">
                            <img src={imagen} alt="" className="img-fluid" width="175" height="175" />
                        </div>
                        <h2 className="flip-box-heading" style={{ color: "#333333" }}> <span>{profesional.apellido}</span>, {profesional.nombre}</h2>
                        {profesional.matricula}
                    </div>
                    {profesional.subespecialidad && <div className="cover" onMouseOver={changeFlip} ></div>}
                </div>
                {profesional.subespecialidad && <div className={"flip-box-back" + ((profesionalSeleccionado && profesional.apellido === profesionalSeleccionado) ? ' selected' : '')} style={{
                    backgroundColor: "rgb(247, 247, 247)", borderRadius: "6px", transitionDuration: "0.5s", zIndex: "3"
                }} >
                    <div className="flip-box-front-inner">
                        <h3 className="flip-box-heading-back" style={{ color: "#333333" }}>
                            <span>{profesional.apellido}</span>, {profesional.nombre}
                        </h3>
                        <div className="content" dangerouslySetInnerHTML={{__html: profesional.subespecialidad}}></div>
                    </div>
                    <div className="cover" onMouseLeave={changeFlip} ></div>
                </div>}
            </ReactCardFlip>
        </div >
    );
};
