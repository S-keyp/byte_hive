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
    <Header subTitle="Contact" />

    <ContactForm />
</template>

<style scoped lang="scss">
@use "./index.scss";
</style>
