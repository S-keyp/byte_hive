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
                dropDownHead="/burger.png"
                :dropDownEntries='
                    [
                        { url: "/", title: "Accueil" },
                        { url: "/about", title: "A propos" },
                        { url: "/use-cases", title: "Cas pratiques" },
                        { url: "/contact", title: "Contact" },
                    ]
                '
            />
        </nav>
    </header>
</template>

<script>
</script>

<style scoped lang="scss">
@use "./index.scss";
</style>
