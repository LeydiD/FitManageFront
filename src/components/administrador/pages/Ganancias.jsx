import React, { useState, useEffect } from "react";
import "./Ganancias.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  obtenerGananciasAnuales,
  obtenerGananciasMensuales,
  obtenerGananciasPorRango,
  obtenerDetalleGananciasPorRango,
} from "../../../api/GananciasApi.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Ganancias = () => {
  // Para la gráfica
  const [frecuencia, setFrecuencia] = useState("Diario");
  const [inicioGrafico, setInicioGrafico] = useState("");
  const [finGrafico, setFinGrafico] = useState("");
  const [anio, setAnio] = useState("");
  const [dataGrafico, setDataGrafico] = useState(null);
  const [errorGrafico, setErrorGrafico] = useState("");

  // Para la tabla
  const [inicioTabla, setInicioTabla] = useState("");
  const [finTabla, setFinTabla] = useState("");
  const [detalleGanancias, setDetalleGanancias] = useState([]);
  const [gananciasTotales, setGananciasTotales] = useState("");

  const data = {
    labels: dataGrafico?.labels || [],
    datasets: [
      {
        label: "Ingresos en Pesos",
        data: dataGrafico?.data || [],
        backgroundColor: "#4bb3fd",
      },
    ],
  };

  const handleBuscarGrafico = async () => {
    try {
      setErrorGrafico("");
      let dataObtenida;
      if (frecuencia === "Mensual") {
        dataObtenida = await obtenerGananciasMensuales(anio);
        setDataGrafico({
          labels: [
            "Ene",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Ago",
            "Sep",
            "Oct",
            "Nov",
            "Dic",
          ],
          data: dataObtenida,
        });
      } else if (frecuencia === "Diario") {
        const diferenciaDias =
          (new Date(finGrafico) - new Date(inicioGrafico)) /
          (1000 * 60 * 60 * 24);
        if (diferenciaDias > 31 || diferenciaDias < 0) {
          setErrorGrafico(
            "El rango de fechas debe ser máximo de 31 días y válido."
          );
          return;
        }
        dataObtenida = await obtenerGananciasPorRango(
          inicioGrafico,
          finGrafico
        );
        setDataGrafico({
          labels: dataObtenida.map((item) => item.fecha),
          data: dataObtenida.map((item) => item.total),
        });
      } else if (frecuencia === "Anual") {
        dataObtenida = await obtenerGananciasAnuales();
        setDataGrafico({
          labels: dataObtenida.map((item) => item.anio),
          data: dataObtenida.map((item) => item.total),
        });
      }
    } catch (error) {
      console.error("Error al obtener ganancias mensuales:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      setErrorGrafico(
        error.response?.data?.mensaje || error.message || "Error inesperado"
      );
    }
  };

  const handleBuscarTabla = async () => {
    try {
      const data = await obtenerDetalleGananciasPorRango(inicioTabla, finTabla);
      setDetalleGanancias(data.resultados);
      setGananciasTotales(data.total);
    } catch (error) {
      console.error("Error al obtener detalle de ganancias:", error);
    }
  };

  useEffect(() => {
    if (frecuencia === "Anual") {
      handleBuscarGrafico();
    } else if (frecuencia === "Mensual" && anio) {
      handleBuscarGrafico();
    } else if (frecuencia === "Diario" && inicioGrafico && finGrafico) {
      handleBuscarGrafico();
    }
  }, [frecuencia, anio, inicioGrafico, finGrafico]);

  // Limpiar campos cuando la frecuencia cambia
  useEffect(() => {
    setAnio("");
    setInicioGrafico("");
    setFinGrafico("");
    setDataGrafico(null);
  }, [frecuencia]);

  return (
    <div className="container" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="ganancias-container" style={{ textAlign: "center" }}>
        <h2>CONSULTAR GANANCIAS</h2>

        <div className="selects-container">
          <select
            className="custom-select"
            value={frecuencia}
            onChange={(e) => setFrecuencia(e.target.value)}
          >
            <option>Diario</option>
            <option>Mensual</option>
            <option>Anual</option>
          </select>

          {frecuencia === "Mensual" && (
            <>
              <input
                type="number"
                value={anio}
                onChange={(e) => setAnio(e.target.value)}
                placeholder="Año"
                className="input-frecuencia"
              />
            </>
          )}

          {frecuencia === "Diario" && (
            <>
              <input
                type="date"
                value={inicioGrafico}
                onChange={(e) => setInicioGrafico(e.target.value)}
                className="input-frecuencia"
              />
              <input
                type="date"
                value={finGrafico}
                onChange={(e) => setFinGrafico(e.target.value)}
                className="input-frecuencia"
              />
            </>
          )}
        </div>

        {errorGrafico && <p className="mensaje-error">{errorGrafico}</p>}

        <div className="seccion-grafico">
          <div
            className="grafico"
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: false },
                },
              }}
            />
          </div>
        </div>

        <hr />

        {/* Nueva sección para tabla */}
        <div className="busqueda-tabla">
          <h3>DETALLE DE GANANCIAS</h3>
          <div className="selects-container">
            <input
              type="date"
              value={inicioTabla}
              onChange={(e) => setInicioTabla(e.target.value)}
              className="input-frecuencia"
            />
            <input
              type="date"
              value={finTabla}
              onChange={(e) => setFinTabla(e.target.value)}
              className="input-frecuencia"
            />
            <button className="buscar" onClick={handleBuscarTabla}>
              Buscar tabla
            </button>
          </div>
        </div>

        <div className="resultado">
          <div className="tabla-resultados">
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Tipo de membresía</th>
                  <th>Fecha</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {detalleGanancias.length > 0 ? (
                  detalleGanancias.map((item, index) => (
                    <tr key={index}>
                      <td>{item.cliente}</td>
                      <td>{item.tipoMembresia}</td>
                      <td>{item.fecha}</td>
                      <td>${item.precio}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4">No hay datos para mostrar.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="campo">
            <input type="text" value={`$${gananciasTotales}`} readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ganancias;
