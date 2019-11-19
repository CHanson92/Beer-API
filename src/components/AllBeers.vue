<template>
    <section
        v-infinite-scroll="loadMoreBeers"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
    >
        <div class="buttons">
            <button
                @click="container = 'all'"
                :class="{ active: container == 'all' }"
            >
                All
            </button>
            <button
                @click="container = 'bottle'"
                :class="{ active: container == 'bottle' }"
            >
                Bottle
            </button>
            <button
                @click="container = 'keg'"
                :class="{ active: container == 'keg' }"
            >
                Keg
            </button>
        </div>
        <div class="beers">
            <div class="beer" v-for="beer in containerFilter" :key="beer.id">
                <img class="lazyload" :src="beer.image_url" />
                <h1>{{ beer.name }}</h1>
                <p>{{ beer.description }}</p>
                <div class="beer-properties">
                    <p>
                        ABV <span>{{ beer.abv }}</span>
                    </p>
                    <p>
                        IBU <span>{{ beer.ibu }}</span>
                    </p>
                    <p
                        v-if="beer.ph > 1 && beer.ph < 5"
                        style="background-color: orange"
                        class="pH"
                    >
                        pH <span>{{ beer.ph }}</span>
                    </p>
                    <p
                        v-else-if="beer.ph > 5 && beer.ph < 7"
                        style="background-color: red"
                        class="pH"
                    >
                        pH <span>{{ beer.ph }}</span>
                    </p>
                    <p v-else style="background-color: blue" class="pH">
                        pH <span>{{ beer.ph }}</span>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import infiniteScroll from 'vue-infinite-scroll';
import 'lazysizes';

export default {
    name: 'AllBeers',
    directives: { infiniteScroll },
    data() {
        return {
            containers: ['all', 'bottle', 'keg'],
            container: 'all',
            beers: [],
            extraBeers: [],
            busy: false,
            count: 1
        };
    },
    computed: {
        containerFilter() {
            return this[this.container];
        },
        all() {
            return this.beers.filter(i => i.image_url !== null);
        },
        bottle() {
            return this.all.filter(i => i.image_url.includes(`${i.id}.png`));
        },
        keg() {
            return this.all.filter(i => i.image_url.includes('keg'));
        }
    },
    methods: {
        async getAllBeers() {
            const url = 'https://api.punkapi.com/v2/beers?page=1&per_page=25';
            await axios
                .get(url)
                .then(response => (this.beers = response.data))
                .catch(error => {
                    throw error;
                });
        },
        async loadMoreBeers() {
            this.busy = true;
            this.count += 1;
            let url = `https://api.punkapi.com/v2/beers?page=${this.count}&per_page=25`;
            await axios
                .get(url)
                .then(response => (this.extraBeers = response.data))
                .then((this.beers = this.beers.concat(this.extraBeers)))
                .catch(error => {
                    throw error;
                });
            this.busy = false;
            if (this.extraBeers.length === 0) {
                this.count = NaN;
                return;
            }
        }
    },
    mounted() {
        this.getAllBeers();
    }
};
</script>

<style scoped lang="scss">
section {
    .buttons {
        display: flex;
        justify-content: space-evenly;
        background: #1b81cb;
        button {
            cursor: pointer;
            padding: 0.75em 1.5em;
            border: none;
            background: transparent;
            color: white;
            font-size: 1.25em;
        }
        .active {
            background: darken(#1b81cb, 10%);
        }
    }
    .beers {
        display: flex;
        flex-wrap: wrap;
        margin: 1em 0em;
        .beer {
            padding: 1em;
            margin-bottom: 1em;
            text-align: center;
            background: #f2f2f2;
            img {
                height: 15em;
                max-width: 100%;
            }
            .beer-properties {
                display: flex;
                flex-flow: row wrap;
                justify-content: space-around;
                p {
                    display: flex;
                    flex-direction: column;
                    padding: 1em 1.5em;
                }
                .pH {
                    color: white;
                }
            }
        }
    }
    @media screen and (min-width: 600px) {
        .beers {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 1em;
        }
    }
    @media screen and (min-width: 900px) {
        .beers {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    @media screen and (min-width: 1200px) {
        .beers {
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
    }
}
</style>
