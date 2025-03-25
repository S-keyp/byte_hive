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
            <h2 class="section__subtitle">💬 Besoin d'un devis ou d'un conseil ?</h2>
            <p>N'hésitez pas à nous écrire, on vous répond dans les plus brefs délais !</p>

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
                <button class="contact-form-button" type="submit">
                    Envoyer
                    <svg
                        width="27"
                        height="27"
                        viewBox="0 0 27 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="1.29289"
                            y1="25.9809"
                            x2="26.1037"
                            y2="1.17009"
                            stroke-width="2"
                        />
                        <line x1="9.45618" y1="0.877197" x2="27" y2="0.877197" stroke-width="2" />
                        <line x1="26" y1="18.5439" x2="26" y2="0.999994" stroke-width="2" />
                    </svg>
                </button>
            </form>
        </div>
    </Container>
</template>

<style scoped lang="scss">
@use "./index.scss";
</style>
