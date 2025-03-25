<template>
    <Main>
        <Header subTitle="Développement web & solutions sur-mesure" />
        <Container>
            <div class="container-content">
                <h2>
                    Innovation et flexibilité au cœur de nos solutions
                </h2>

                <p>
                    Chez Byte Hive, on conçoit et développe des solutions digitales adaptées aux
                    besoins spécifiques de nos clients. Que ce soit pour la création de sites web
                    intuitifs et facilement modifiables ou pour le développement d'applications
                    complexes sur mesure, on met notre expertise à votre service.
                </p>
            </div>
        </Container>
        <Container>
            <div class="container-content">
                <h2>Des sites web performants et évolutifs</h2>

                <p>
                    On développe des sites web modernes, ergonomiques et optimisés pour une gestion
                    simplifiée. Grâce à des interfaces intuitives et des outils flexibles, nos
                    clients peuvent facilement mettre à jour leurs contenus sans compétences
                    techniques particulières.
                </p>
            </div>
        </Container>
        <Container>
            <div class="container-content">
                <h2>Développement sur mesure : Python, Django, Vue.js et bien plus</h2>

                <p>
                    Chaque projet est unique, et on le sait. C'est pourquoi on propose des solutions
                    entièrement personnalisées en utilisant les technologies les plus adaptées :
                    Python, Django, Vue.js, Nuxt, HTML, CSS, et bien d'autres. De l'analyse des
                    besoins à la mise en production, on accompagne nos clients à chaque étape pour
                    garantir des résultats à la hauteur de leurs attentes.
                </p>
            </div>
        </Container>
        <Container>
            <div class="container-content">
                <h2>Pourquoi choisir Byte Hive ?</h2>
                <ul>
                    <li>
                        <span>Expertise technique:</span>
                        <br />Une maîtrise des technologies les plus avancées du web et du
                        développement logiciel.
                    </li>
                    <li>
                        <span>Accompagnement personnalisé:</span>
                        <br />Nous travaillons en étroite collaboration avec nos clients pour créer
                        des solutions sur-mesure.
                    </li>
                    <li>
                        <span>Innovation et performance:</span>
                        <br />Des applications et sites web rapides, sécurisés et évolutifs.
                    </li>
                </ul>

                <p>
                    Envie de donner vie à votre projet digital ? <strong><NuxtLink to="contact"
                        >Contactez-nous</NuxtLink>
                    </strong> et parlons-en ensemble !
                </p>
            </div>
        </Container>
    </Main>
</template>

<script setup>
useSeoMeta({
    title: "Home",
    description: "This is the home page",
    keywords: "home, page, vue, nuxt",
    ogImage: "https://example.com/image.jpg",
    ogUrl: "https://example.com",
});
</script>
