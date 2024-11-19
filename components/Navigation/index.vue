<template>
    <header>
        <nav class="navbar">
            <NuxtLink to="/" class="company-logo-full">
                <img class="company-logo" src="~/assets/img/logo-company.png" alt="">
                <img class="company-logo-letters" src="~/assets/img/logo-company-lettes.png" alt="">
            </NuxtLink>
            <ul class="navbar-items">
                <li class="navbar-item"><NuxtLink to="/">Accueil</NuxtLink></li>
                <li class="navbar-item"><NuxtLink to="/about">A propos</NuxtLink></li>
                <li class="navbar-item"><NuxtLink to="/use-cases">Cas pratiques</NuxtLink></li>
                <li class="navbar-item"><NuxtLink to="/contact">Contact</NuxtLink></li>
            </ul>
         </nav>
    </header>
</template>

<script>
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>