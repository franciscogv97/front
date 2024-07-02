import React from 'react';
import './Homestyle.css';
import headerImage from './img/cafebanner.PNG';

import machineImage from './img/maquina.jfif';
import grainImage from './img/grano.jfif';
import branchImage from './img/sucursales.jpg';

function Home() {
    return (
        <div className="container">
            <header className="header">
                <img src={headerImage} alt="Header" className="header-image" />
            </header>
            <main className="main-content">
                <section className="section">
                    <img src={machineImage} alt="Nuestras Máquinas" className="section-image" />
                    <h2>Nuestras Máquinas</h2>
                    <p>Nuestras máquinas están a la vanguardia de la tecnología, diseñadas para maximizar la eficiencia y productividad en el procesamiento de granos. Con un enfoque en la durabilidad y la innovación, nuestras máquinas garantizan un rendimiento superior y una operación continua. Cada máquina es sometida a rigurosas pruebas de calidad para asegurar que cumplen con los más altos estándares de la industria.</p>
                </section>
                <section className="section">
                    <img src={grainImage} alt="Nuestros Granos" className="section-image" />
                    <h2>Nuestros Granos</h2>
                    <p>Seleccionamos los mejores granos de todo el país, garantizando la máxima calidad en cada producto. Nuestros granos son cultivados con técnicas agrícolas sostenibles, asegurando un impacto mínimo en el medio ambiente y el mejor sabor y valor nutritivo para nuestros consumidores. Ofrecemos una variedad de granos que se adaptan a diversas necesidades alimenticias y de producción.</p>
                </section>
                <section className="section">
                    <img src={branchImage} alt="Sucursales" className="section-image" />
                    <h2>Sucursales</h2>
                    <p>Contamos con una red de sucursales estratégicamente ubicadas en todo el país para estar más cerca de nuestros clientes. Cada sucursal está equipada con modernas instalaciones y un equipo de expertos listos para ofrecer el mejor servicio y asesoramiento. Visítanos en cualquiera de nuestras sucursales y descubre la diferencia en calidad y atención que ofrecemos.</p>
                </section>
            </main>
            <footer className="footer">
                <p>Chile, 2024</p>
            </footer>
        </div>
    );
}

export { Home };
