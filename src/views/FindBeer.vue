<template>
    <section>
        <form @submit.prevent="checkForm">
            <h1>Find a Beer</h1>
            <div class="name">
                <label>Name</label>
                <input v-model="beer_name" />
            </div>
            <div class="hops">
                <label>Hops</label>
                <input v-model="hops" type="text" />
            </div>
            <div class="abv">
                <label>ABV</label>
                <input
                    v-model="abv_gt"
                    type="number"
                    placeholder="greater than"
                />
                <input v-model="abv_lt" type="number" placeholder="less than" />
            </div>
            <div class="ibu">
                <label>IBU</label>
                <input
                    v-model="ibu_gt"
                    type="number"
                    placeholder="greater than"
                />
                <input v-model="ibu_lt" type="number" placeholder="less than" />
            </div>
            <div class="ebc">
                <label>EBC</label>
                <input
                    v-model="ebc_gt"
                    type="number"
                    placeholder="greater than"
                />
                <input v-model="ebc_lt" type="number" placeholder="less than" />
            </div>
            <button class="submit" type="submit">Find a Beer</button>
        </form>
        <transition name="slide-fade">
            <div class="errors" v-if="errors.length">
                <b>Please correct the following error(s):</b>
                <ul>
                    <li v-for="error in errors" :key="error.index">
                        {{ error }}
                    </li>
                </ul>
            </div>
        </transition>
        <div class="beers">
            <div class="beer" v-for="beer in beers" :key="beer.id">
                <div v-if="beer.image_url" class="image">
                    <img class="lazyload" :src="beer.image_url" />
                </div>
                <p class="no-image" v-else>
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
                        <div class="yeast">
                            <strong>Yeast</strong>
                            <p>{{ beer.ingredients.yeast }}</p>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import qs from 'qs';

export default {
    name: 'FindBeer',
    data() {
        return {
            errors: [],
            beer_name: '',
            hops: '',
            abv_gt: '',
            abv_lt: '',
            ibu_gt: '',
            ibu_lt: '',
            ebc_gt: '',
            ebc_lt: '',
            beers: [],
            isHidden: true
        };
    },
    methods: {
        checkForm() {
            this.errors = [];
            this.beers = [];
            if (!this.beer_name) {
                this.errors.push('Name required.');
            }
            if (!this.hops) {
                this.errors.push('Hops required.');
            }
            if (!this.abv_gt) {
                this.errors.push('Greater than ABV required.');
            }
            if (!this.abv_lt) {
                this.errors.push('Less than ABV required.');
            }
            if (!this.ibu_gt) {
                this.errors.push('Greater than IBU required.');
            }
            if (!this.ibu_lt) {
                this.errors.push('Less than IBU required.');
            }
            if (!this.ebc_gt) {
                this.errors.push('Greater than EBC required.');
            }
            if (!this.ebc_lt) {
                this.errors.push('Less than EBC required.');
            }

            if (
                this.beer_name ||
                this.hops ||
                this.abv_gt ||
                this.abv_lt ||
                this.ibu_gt ||
                this.ibu_lt ||
                this.ebc_gt ||
                this.ebc_lt
            ) {
                this.errors = [];
                this.findBeer();
            }
        },
        async findBeer() {
            this.beers = [];
            const params = {
                beer_name: this.beer_name,
                hops: this.hops,
                abv_gt: this.abv_gt,
                abv_lt: this.abv_lt,
                ibu_gt: this.ibu_gt,
                ibu_lt: this.ibu_lt,
                ebc_gt: this.ebc_gt,
                ebc_lt: this.ebc_lt
            };
            const url = 'https://api.punkapi.com/v2/beers';
            await axios
                .get(url, {
                    params: _.pickBy(params, value => {
                        return !!value;
                    }),
                    paramsSerializer: function(params) {
                        return qs.stringify(params);
                    }
                })
                .then(response => (this.beers = response.data))
                .catch(error => {
                    throw error;
                });
            if (this.beers.length === 0) {
                alert('Sorry there are no results, please try again!');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
section {
    form {
        padding: 1em;
        text-align: center;
        background: #f2f2f2;
        h1 {
            padding-bottom: 0.25em;
            border-bottom: 1px gray solid;
            color: #1b81cb;
        }
        .name,
        .hops {
            input {
                margin-left: 1em;
            }
        }
        .name,
        .hops,
        .abv,
        .ibu,
        .ebc {
            padding: 0.5em;
        }
        input {
            padding: 0.5em;
        }
        .abv,
        .ibu,
        .ebc {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            input {
                width: 7em;
                margin: 0.5em;
            }
        }
        .submit {
            cursor: pointer;
            margin-top: 1em;
            padding: 0.75em 2em;
            border: none;
            font-size: 1em;
            background: #1b81cb;
            color: white;
        }
    }
    .beer {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column wrap;
        text-align: center;
        margin-top: 2em;
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
            cursor: pointer;
            padding: 1em 3em;
            border: none;
            font-size: 1em;
            background: #1b81cb;
            color: white;
        }
        .fade-enter-active,
        .fade-leave-active {
            transition: opacity 0.5s;
        }
        .fade-enter,
        .fade-leave-to {
            opacity: 0;
        }
        .ingredients {
            margin-top: 1em;
        }
    }
    .errors {
        margin-top: 2em;
        text-align: center;
        color: red;
        li {
            list-style: none;
        }
    }

    @media screen and (min-width: 600px) {
        form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            text-align: inherit;

            h1 {
                grid-column: 1/3;
            }

            .name,
            .hops,
            .abv,
            .ibu,
            .ebc {
                justify-self: center;
            }

            .abv,
            .ibu,
            .ebc {
                flex-direction: inherit;
            }

            .ebc {
                grid-column: 1/3;
            }

            .submit {
                grid-column: 1/3;
                grid-row: 5;
                justify-self: center;
            }
        }

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

    @media screen and (min-width: 900px) {
        form {
            grid-template-columns: 1fr 1fr 1fr;

            h1 {
                grid-column: 1/5;
            }

            .name {
                grid-column: 1/3;
                grid-row: 2;
            }

            .hops {
                grid-column: 2/4;
                grid-row: 2;
            }

            .abv,
            .ibu,
            .ebc {
                grid-row: 3;
            }

            .ebc {
                grid-column: inherit;
            }

            .submit {
                grid-column: 1/5;
            }
        }

        .beers {
            display: grid;
            grid-template-columns: 1fr 1fr;

            .beer {
                grid-template-columns: 1fr;

                .image,
                .no-image {
                    grid-column: 1/3;
                }

                .info {
                    p {
                        margin: 1em;
                    }
                }

                .beer-properties {
                    grid-row: 3;
                }
            }
        }
    }

    @media screen and (min-width: 1200px) {
        .beers {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
}
</style>
