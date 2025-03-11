<script setup>
const config = useRuntimeConfig();
const formSpreeUrl = config.formSpreeUrl;

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

    fetch(formSpreeUrl, {
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
    <Container>
        <div class="contact-form">
            <h2 class="section__subtitle">Contactez-nous</h2>

            <form @submit="checkForm" id="my-form-status" method="POST" ref="form">
                <label>
                    <span>Prénom:</span>
                    <input type="text" name="prenom" minlength="2" pattern="[A-Za-z]+" required>
                </label>
                <label>
                    <span>Email:</span>
                    <input type="email" name="email" required>
                </label>
                <label>
                    <span>Téléphone:</span>
                    <input type="phone" name="tel" pattern="[0-9]{10}" required>
                </label>
                <label>
                    Message:
                    <textarea
                        class="contact-form-textarea"
                        name="message"
                        minlength="10"
                        cols="50"
                        rows="10"
                    ></textarea>
                </label>
                <button class="contact-form-button" type="submit">Envoyer</button>
            </form>
        </div>
    </Container>
</template>

<style scoped lang="scss">
@use "./index.scss";
</style>
