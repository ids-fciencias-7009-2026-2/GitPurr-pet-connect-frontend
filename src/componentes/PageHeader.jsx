import "../estilos/componentes/PageHeader.css";

function PageHeader({ titulo, subtitulo }) {
    return (
        <header className="page-header">
            <div className="page-header-contenido">
                <h1>{titulo}</h1>
                {subtitulo && <p>{subtitulo}</p>}
            </div>
        </header>
    );
}

export default PageHeader;