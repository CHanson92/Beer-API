<template>
    <section>
        <transition name="fade" mode="out-in">
            <div class="beer" v-for="beer in beer" :key="beer.id">
                <div v-if="beer.image_url" class="image">
                    <img class="lazyload" :src="beer.image_url" />
                </div>
                <p v-else>
                    Sorry, no image is provided!
                </p>
                <div class="info">
                    <h1>{{ beer.name }}</h1>
                    <h3>{{ beer.tagline }}</h3>
                    <p>{{ beer.description }}</p>
                </div>
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
                <button class="get-ingredients" @click="isHidden = !isHidden">
                    Ingredients
                </button>
                <transition name="fade" mode="out-in">
                    <div class="ingredients" v-if="!isHidden">
                        <div class="yeast">
                            <strong>Yeast</strong>
                            <p>{{ beer.ingredients.yeast }}</p>
                        </div>
                        <div class="malt">
                            <strong>Malt</strong>
                            <p
                                v-for="malt in beer.ingredients.malt"
                                :key="malt.index"
                            >
                                {{ malt.name }} ({{ malt.amount.value }}
                                {{ malt.amount.unit }})
                            </p>
                        </div>
                        <div class="hops">
                            <strong>Hops</strong>
                            <p
                                v-for="hops in beer.ingredients.hops"
                                :key="hops.index"
                            >
                                {{ hops.name }} ({{ hops.amount.value }}
                                {{ hops.amount.unit }})
                            </p>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <button class="pick-another" @click="getRandomBeer">
            Pick another beer
        </button>
    </section>
</template>

<script>
import axios from 'axios';
export default {
    name: 'RandomBeer',
    data() {
        return {
            beer: [],
            isHidden: true
        };
    },
    methods: {
        async getRandomBeer() {
            const url = 'https://api.punkapi.com/v2/beers/random';
            await axios
                .get(url)
                .then(response => (this.beer = response.data))
                .catch(error => {
                    throw error;
                });
        }
    },
    mounted() {
        this.getRandomBeer();
    }
};
</script>

<style scoped lang="scss">
section {
    text-align: center;
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
    .beer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;
        margin: 1em 0;
        padding: 0.5em;
        text-align: center;
        background: #f2f2f2;
        img {
            height: 15em;
            max-width: 100%;
        }
        .info {
            h3 {
                color: #1b81cb;
            }
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
        .get-ingredients {
            background: #1b81cb;
        }
        .ingredients {
            margin-top: 1em;
        }
    }
    button {
        cursor: pointer;
        padding: 1em 3em;
        border: none;
        font-size: 1em;
        background: #ffc502;
        color: white;
    }
    @media screen and (min-width: 600px) {
        .beer {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .info {
                grid-column: 2;
            }

            .beer-properties {
                grid-column: 1/3;
                grid-row: 2;
            }

            .get-ingredients {
                grid-column: 1/3;
                justify-self: center;
            }

            .ingredients {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                grid-column: 1/3;
                justify-self: stretch;
            }
        }
    }
}
</style>
