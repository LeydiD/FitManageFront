import React, { useState } from 'react';
import { registrarAsistencia } from '../../../api/AsistenciasApi';

const RegistrarAsistencia = () => {
  const fechaHoy = new Date().toLocaleDateString('es-ES');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleRegistrarAsistencia = async () => {
    setIsLoading(true);
    setMessage(null);
    setIsError(false);
    
    try {
      const resultado = await registrarAsistencia();
      setMessage('Asistencia registrada correctamente');
      console.log('Asistencia registrada:', resultado);
    } catch (error) {
      setIsError(true);
      setMessage(error.message || 'Error al registrar asistencia');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage: "url('/fondo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'black',
        padding: '1rem'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4">
            <div className="bg-white rounded p-4 shadow-lg">
              <h1 className="fw-bold mb-4 text-center text-dark">Registrar Asistencia</h1>

              <p className="text-muted fs-5 mb-2 text-center">
                ¡Registra tu asistencia de hoy!
              </p>
              <p className="text-muted fs-5 mb-4 text-center">{fechaHoy}</p>

              <button 
                className="btn btn-danger w-100 fw-bold"
                onClick={handleRegistrarAsistencia}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Registrando...
                  </>
                ) : 'Registrar'}
              </button>

              {message && (
                <div className={`mt-3 alert ${isError ? 'alert-danger' : 'alert-success'}`}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarAsistencia;