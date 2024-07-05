import React from 'react';
import './Page2.css';

function Page2() {
    return (
        <>
      
            <div className="about-container">
                <h1>Acerca de Nosotros</h1>
                <div className="columns">
                    <section>
                        <h2>Nuestra Historia</h2>
                        <p>
                            Bienvenidos a Sparrows, un lugar donde el aroma del café se mezcla con la pasión y dedicación de nuestros baristas. Fundada en 2022, nuestra cafetería ha sido un refugio acogedor para los amantes del café, ofreciendo una experiencia única en cada taza.
                        </p>
                    </section>
                    <section>
                        <h2>Nuestra Misión</h2>
                        <p>
                            Nuestra misión es proporcionar un café excepcional, preparado con los mejores granos seleccionados cuidadosamente de las mejores fincas del mundo. Creemos en la importancia de la calidad, la sostenibilidad y el impacto positivo en nuestras comunidades locales y globales.
                        </p>
                    </section>
                </div>
                <div className="columns">
                    <section>
                        <h2>Nuestra Visión</h2>
                        <p>
                            Aspiramos a ser más que una simple cafetería. Queremos ser un lugar donde las personas se reúnan, compartan historias y creen recuerdos inolvidables, todo mientras disfrutan de una taza de café perfecta.
                        </p>
                    </section>
                    <section>
                        <h2>Nuestros Valores</h2>
                        <p>
                            Nos basamos en valores como la calidad, la integridad, y la sostenibilidad, buscando siempre mejorar la experiencia de nuestros clientes y apoyar a nuestras comunidades.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
}

export { Page2 };
