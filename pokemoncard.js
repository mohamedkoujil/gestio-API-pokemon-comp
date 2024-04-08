app.component('pokemon-card', {
    props: ['pokemon-data', 'favorite', 'img', 'info', 'ok'],
    methods: {
        toggleFav() {
            this.$emit('togglefav');
        },
    },
    template:
        `
        <div class="pokemonCard flexColumn center alignself-left verdanaFont" v-show="ok" id="datos">
            <img v-if="favorite" class="margin05 alignself-right fav-img"
                @click="toggleFav" src="images/fav.png"></img>
            <img v-else class="alignself-right fav-img" @click="toggleFav" src="images/no-fav.png"></img>
            <img class="img-pokemon" :src="img">
            <div class="title">{{ pokemonData.name }}</div class="title">
            <div class="flex flexStart flexColumn" v-show="info" id="masInfo">
                <div v-for="type in pokemonData.types">
                    <div class="margin025">{{ type.type.name }}</div>
                </div>
                <div v-for="ability in pokemonData.abilities">
                    <div class="margin025">{{ ability.ability.name }}</div>
                </div>
                <div v-for="stat in pokemonData.stats">
                    <div class="margin025">{{ stat.stat.name }}: {{ stat.base_stat }}</div>
                </div>
            </div>
        </div>
    `
});
