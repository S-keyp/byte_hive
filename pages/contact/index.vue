<script setup>
const config = useRuntimeConfig();
console.log("config", config);
// const formSpreeUrl = config.public.formSpreeUrl;

let email = null;
let message = null;
let errors = [];
let form = null;

function checkForm(e) {
    if (email && message) {
        return true;
    }

    errors = [];

    if (!email) {
        errors.push("Email required.");
    }
    if (!message) {
        errors.push("Message required.");
    }

    e.preventDefault();
    handleSubmit(e);
}

async function handleSubmit(event) {
    event.preventDefault();
    let status = document.getElementById("my-form-status");
    let data = new FormData(event.target);

    fetch("https://formspree.io/f/movjyaqp", { //formSpreeUrl, {
        method: "POST",
        body: data,
        headers: {
            "Accept": "application/json",
        },
    }).then((response) => {
        if (response.ok) {
            status.innerHTML = "Merci pour ton mail!";
            form.reset();
        } else {
            response.json().then(() => {
                status.innerHTML =
                    "Oops! Il y a eu un problème en envoyant ton mail, réessaye plus tard .!";
            });
        }
    }).catch((e) => {
        status.innerHTML =
            "Oops! Il y a eu un problème en envoyant ton mail, réessaye plus tard .!";
    });
}
</script>

<template>
    <Header subTitle="Contactez-nous 📩" />

    <Container>
        <div class="container-content">
            <h2>Vous avez un projet en tête ou une question ? On est à votre écoute !</h2>
            <div class="flex-container">
                <div class="container-content-infos">
                    <h3>📌 Informations</h3>
                    <ul>
                        <li>📍 Adresse : 123 Avenue du Code, 75000 Paris</li>
                        <li>📞 Téléphone : 01 23 45 67 89</li>
                        <li>📧 Email : contact@bytehive.dev</li>
                    </ul>

                    <h3>🕒 Horaires d'ouverture :</h3>
                    <ul>
                        <li>🗓 Lundi - Vendredi</li>
                        <li>⏰ Matin : 9h - 12h</li>
                        <li>⏰ Après-midi : 14h - 18h</li>
                    </ul>
                </div>

                <ContactForm />
            </div>
        </div>
    </Container>
</template>

<style scoped lang="scss">
@use "./index.scss";
</style>
