<template>
    <header>
        <nav class="navbar">
            <NuxtLink to="/" class="company-logo-full">
                <img class="company-logo" src="~/assets/img/logo-company.png" alt="">
                <img class="company-logo-letters" src="~/assets/img/logo-company-lettes.png" alt="">
            </NuxtLink>
            
            <svg class="navbar-burger" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 17C9 15.8954 9.89543 15 11 15H39C40.1046 15 41 15.8954 41 17V18H9V17Z" fill="#F9FAFD" fill-opacity="0.866667"/>
                <path d="M10 25L10.1612 24.8281C11.1724 23.7495 12.7815 23.4834 14.086 24.1792V24.1792C15.0479 24.6922 16.2021 24.6922 17.164 24.1792L17.5 24C18.6719 23.375 20.0781 23.375 21.25 24V24C22.4219 24.625 23.8281 24.625 25 24V24C26.1719 23.375 27.5781 23.375 28.75 24V24C29.9219 24.625 31.3281 24.625 32.5 24L32.836 23.8208C33.7979 23.3078 34.9521 23.3078 35.914 23.8208V23.8208C37.2185 24.5166 38.8276 24.2505 39.8388 23.1719L40 23V25L39.8388 25.1719C38.8276 26.2505 37.2185 26.5166 35.914 25.8208V25.8208C34.9521 25.3078 33.7979 25.3078 32.836 25.8208L32.5 26C31.3281 26.625 29.9219 26.625 28.75 26V26C27.5781 25.375 26.1719 25.375 25 26V26C23.8281 26.625 22.4219 26.625 21.25 26V26C20.0781 25.375 18.6719 25.375 17.5 26L17.164 26.1792C16.2021 26.6922 15.0479 26.6922 14.086 26.1792V26.1792C12.7815 25.4834 11.1724 25.7495 10.1612 26.8281L10 27V25Z" fill="#F9FAFD" fill-opacity="0.866667"/>
                <path d="M9 31H41V32C41 33.1046 40.1046 34 39 34H11C9.89543 34 9 33.1046 9 32V31Z" fill="#F9FAFD" fill-opacity="0.866667"/>
            </svg>

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