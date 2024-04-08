const apiLink = 'https://pokeapi.co/api/v2/'
        
        const app = Vue.createApp({
            data() {
                return {
                    pokemon: '',
                    ok: false,
                    pokemonData: {},
                    showImg: false,
                    pokemonNoEncontrado: false,
                    favoritos: [],
                    masInfo: false,
                    allPokemon: []
                };
            },

            methods: {
                verPokemon() {
                    if (this.pokemon == '') {
                        return;
                    }
                    this.conectaApi("pokemon/" + this.pokemon.toLowerCase());
                },

                conectaApi(pokemon) {
                    fetch(apiLink + pokemon)
                        .then((res) => {
                            if (res.ok) {
                                return res.json();
                            } else {
                                this.ok = false;
                                this.pokemonNoEncontrado = true;
                                throw new Error('Error en la llamada a la API');
                            }
                        })
                        .then((js) => {
                            console.log(js);
                            this.pokemonData = js;
                            this.showImg = true;
                            this.ok = true;
                            this.pokemonNoEncontrado = false;
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                },

                imgLink(pokemon) {
                    const id = pokemon.id;
                    switch (true) {
                        case id < 10:
                            return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/00" + id + ".png";
                        case id < 100:
                            return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/0" + id + ".png";
                        default:
                            return "https://assets.pokemon.com/assets/cms2/img/pokedex/full/" + id + ".png";
                    }
                },

                toggleFavorite(pokemon) {
                    if (this.isInFavorites(pokemon)) {
                        this.removeFav(pokemon);
                    } else {
                        this.addFav();
                    }
                },

                addFav() {
                    let pokemonName = this.pokemonData.name;
                    if (!this.favoritos.some(fav => fav.name == pokemonName)) {
                        this.favoritos.push(this.pokemonData);
                        localStorage.setItem('favorites', JSON.stringify(this.favoritos));
                    }
                },

                removeFav(pokemon) {
                    this.favoritos = this.favoritos.filter(fav => fav.name != pokemon.name);
                    localStorage.setItem('favorites', JSON.stringify(this.favoritos));
                },

                loadFavorites() {
                    const favorites = localStorage.getItem('favorites');
                    if (favorites) {
                        this.favoritos = JSON.parse(favorites);
                    }
                },

                isInFavorites(pokemon) {
                    return this.favoritos.some(fav => fav.name == pokemon.name);
                },

                clickLupa() {
                    this.verPokemon();
                },

                loadAllPokemon() {
                    console.log(apiLink + "pokemon?limit=100000&offset=0");
                    fetch(apiLink + "pokemon?limit=100000&offset=0")
                        .then((res) => {
                            if (res.ok) {
                                return res.json();
                            } else {
                                this.ok = false;
                                this.pokemonNoEncontrado = true;
                                throw new Error('Error en la llamada a la API');
                            }
                        })
                        .then((js) => {
                            this.allPokemon = js;
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                    console.log(this.allPokemon);
                }
            },

            mounted() {
                this.loadFavorites();
                this.loadAllPokemon();
            }
        });