<template>
    <div id="app">
        <header>
            <img alt="Beer logo" src="./assets/images/logo.png" />
            <div class="buttons">
                <button
                    v-for="tab in tabs"
                    :key="tab.name"
                    :class="{ active: currentTab === tab }"
                    @click="currentTab = tab"
                >
                    {{ tab.name }}
                </button>
            </div>
        </header>

        <transition name="slide-fade">
            <component
                v-bind:is="currentTabComponent.component"
                class="tab"
            ></component>
        </transition>
    </div>
</template>

<script>
import AllBeers from './components/AllBeers';
import RandomBeer from './components/RandomBeer';
import FindBeer from './components/FindBeer';

export default {
    name: 'app',
    components: {
        AllBeers,
        RandomBeer,
        FindBeer
    },
    data() {
        return {
            currentTab: '',
            tabs: [
                {
                    name: 'All Beers',
                    component: 'AllBeers'
                },
                {
                    name: 'Random Beer',
                    component: 'RandomBeer'
                },
                {
                    name: 'Find a Beer',
                    component: 'FindBeer'
                }
            ]
        };
    },
    computed: {
        currentTabComponent: function() {
            return this.currentTab;
        }
    }
};
</script>

<style lang="scss">
#app {
    font-family: 'Roboto', sans-serif;
    .slide-fade-enter-active {
        transition: all 0.3s ease;
    }
    .slide-fade-leave-active {
        transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
    }
    .slide-fade-enter,
    .slide-fade-leave-to {
        transform: translateY(20px);
        opacity: 0;
    }
    header {
        display: flex;
        background: black;

        img {
            max-width: 15em;
        }

        .buttons {
            display: flex;
            justify-content: space-around;
            flex-direction: column;
            margin-bottom: 0.5em;
            button {
                cursor: pointer;
                border: none;
                background: transparent;
                font-size: 1.25em;
                color: white;
            }
            .active {
                color: #1b81cb;
                text-decoration: underline;
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
                max-width: 20em;
            }
            .buttons {
                grid-column: 2;
                flex-direction: row;
            }
        }
    }
}
</style>
