<template>
    <div id="app">
        <header>
            <img alt="Beer logo" src="./assets/images/logo.png" />
            <nav>
                <router-link to="/all-beers">All Beers</router-link>
                <router-link to="/random-beer">Random Beer</router-link>
                <router-link to="/find-beer">Find Beer</router-link>
            </nav>
        </header>
        <transition name="slide-fade" mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="scss" scoped>
#app {
    font-family: 'Roboto', sans-serif;
    .slide-fade-enter-active,
    .slide-fade-leave-active {
        transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateY(15px);
        opacity: 0;
    }
    header {
        display: grid;
        grid-template-columns: 1fr;
        background: black;

        img {
            justify-self: center;
        }

        nav {
            justify-self: flex-start;
            display: flex;
            flex-direction: column;
            margin-left: 1em;
            margin-bottom: 0.5em;

            a {
                cursor: pointer;
                border: none;
                background: transparent;
                font-size: 1.25em;
                text-decoration: none;
                color: white;

                &.router-link-exact-active {
                    text-decoration: underline;
                    color: #1b81cb;
                }
            }
        }
    }

    @media screen and (min-width: 600px) {
        header {
            display: grid;
            grid-template-columns: 1fr 1fr;

            img {
                grid-column: 1/3;
                justify-self: center;
            }

            nav {
                grid-column: 2;
                justify-self: stretch;
                justify-content: space-around;
                flex-direction: row;
            }
        }
    }
}
</style>
