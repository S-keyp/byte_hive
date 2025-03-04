<template>
    <header>
        <nav class="navbar">
            <NuxtLink to="/" class="company-logo-full">
                <img
                    class="company-logo"
                    src="~/assets/img/logo-company.png"
                    alt=""
                >
                <img
                    class="company-logo-letters"
                    src="~/assets/img/logo-company-lettes.png"
                    alt=""
                >
            </NuxtLink>

            <DropDown
                class="navbar--small"
                dropDownHead="/icons/burger.png"
                :dropDownEntries='
                    [
                        { url: "/", title: "Accueil" },
                        { url: "/expertise", title: "Expertise" },
                        { url: "/websites", title: "Websites" },
                        { url: "/contact", title: "Contact" },
                    ]
                '
            />

            <ul class="navbar--large navbar-items">
                <li class="navbar-item"><NuxtLink to="/">Accueil</NuxtLink></li>
                <li class="navbar-item">
                    <NuxtLink to="/expertise">Expertise</NuxtLink>
                </li>
                <li class="navbar-item">
                    <NuxtLink to="/websites">Websites</NuxtLink>
                </li>
                <li class="navbar-item">
                    <NuxtLink to="/contact">Contact</NuxtLink>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
