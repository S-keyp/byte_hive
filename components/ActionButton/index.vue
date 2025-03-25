<script setup>
// import { ContactForm } from "#components";
</script>

<template>
    <div class="action-container">
        <svg
            class="action-container-main"
            width="20"
            height="6"
            viewBox="0 0 20 6"
            preserve-aspect-ratio="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3ZM13 3C13 4.65685 11.6569 6 10 6C8.34315 6 7 4.65685 7 3C7 1.34315 8.34315 0 10 0C11.6569 0 13 1.34315 13 3ZM17 6C18.6569 6 20 4.65685 20 3C20 1.34315 18.6569 0 17 0C15.3431 0 14 1.34315 14 3C14 4.65685 15.3431 6 17 6Z"
                fill="url(#paint0_linear_48_5)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_48_5"
                    x1="10"
                    y1="6"
                    x2="10"
                    y2="9.93433e-09"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stop-color="#F9FAFD" />
                    <stop offset="1" stop-color="#F9FAFD" stop-opacity="0" />
                </linearGradient>
            </defs>
        </svg>
        <a href="#">
            <svg
                class="action-up-arrow"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M7.6263 0.420417C7.82519 0.19666 8.17481 0.19666 8.3737 0.420418L15.2603 8.16782C15.5469 8.49027 15.318 9 14.8866 9H11.5C11.2239 9 11 9.22386 11 9.5V16.5C11 16.7761 10.7761 17 10.5 17H5.5C5.22386 17 5 16.7761 5 16.5V9.5C5 9.22386 4.77614 9 4.5 9H1.11342C0.681998 9 0.453095 8.49027 0.739717 8.16782L7.6263 0.420417Z"
                    fill="#f9fafd"
                />
            </svg>
        </a>

        <svg
            class="action-mail"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            onclick="contactModal.showModal()"
        >
            <g id="Complete">
                <g id="mail">
                    <g>
                        <polyline
                            fill="none"
                            points="4 8.2 12 14.1 20 8.2"
                            stroke="#f9fafd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        />
                        <rect
                            fill="none"
                            height="14"
                            rx="2"
                            ry="2"
                            stroke="#f9fafd"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            width="18"
                            x="3"
                            y="6.5"
                        />
                    </g>
                </g>
            </g>
        </svg>

        <dialog id="contactModal">
            <form method="dialog">
                <button class="close-modal">X</button>
            </form>

            <ContactForm />
        </dialog>

        <!-- <div class="actions">
        </div> -->
    </div>
</template>

<style lang="scss">
@use "./index.scss";
</style>
