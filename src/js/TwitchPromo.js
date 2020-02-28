class TwitchPromo extends HTMLElement {
    constructor() {
        // Always call super first in constructor
        super();

        this.attachShadow({mode: 'open'});

        this.username = this.getAttribute('username');

        

        
    }

    async connectedCallback() {
        this.TWITCH_DATA = await this.getTwitchContent();
        this.render();
    }

    async getTwitchContent() {
        let url = `https://api.twitch.tv/helix/streams?user_login=${this.username}`
        const request = new Request(url, {method: 'GET', headers: {'Client-ID': '5vil9sjm37lx0n882v1lvxcvce2ugf'} });
        const response = await fetch(request);
        const json = await response.json();
        if (json.data) return json.data[0];

    }

    removePromo() {

        return this.remove();
    }

    styleComponent() {

        let styleString = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .twitch-promo-container {
                position: fixed;
                bottom: 1rem;
                right: 1rem;
                width: 200px;
            }
            .twitch-promo {
                display: block;
                background-color: white;
                padding: 1rem;
                font-size: .85rem;
                line-height: 1.3em;
                border: 3px solid black;

                color: black;
                text-decoration: none;
                transition: background-color .3s ease-out, box-shadow .3s ease-out;
            }
            .twitch-promo:hover {
                background-color: #e0cdfb;
            }
            .twitch-promo > * + * {
                margin-top: .85rem;
            }
            .twitch-promo__image {
                display: block;
                max-width: 4rem;
                margin-left: auto;
                margin-right: auto;
            }
            .twitch-promo__headline {
                font-size: 1.25rem;
            }
            .twitch-promo__title {

            }
            .twitch-promo__close-button {
                position: absolute;
                top: .5rem;
                right: .5rem;
                border: 0;
                width: 1.3rem;
                height: 1.3rem;
                font-size: 1.1rem;
                background: none;
                line-height: 1em;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;

            }
            twitch-promo {
                position: relative;
            }
            @media (max-width: 640px) {
                .twitch-promo {
                    bottom: .5rem;
                    right: .5rem;
                    width: calc(100% - 1rem);
                    display: grid;
                    grid-template-columns: .25fr 1fr;
                    grid-gap: .5rem;
                    align-items: center;

                }
                .twitch-promo > * {
                    margin: 0;
                }
                .twitch-promo__image {
                    grid-row: span 2;

                }
            }
        `
        return styleString;
    }

    async render() {
        const data = await this.TWITCH_DATA;


        if (data) {
            this.shadowRoot.innerHTML = `
                <style>
                    ${this.styleComponent()}
                </style>
                <div class="twitch-promo-container">
                    <button class="twitch-promo__close-button">x</button>

                    <a href="https://twitch.com/${data.user_name}" class="twitch-promo">
                        <img class="twitch-promo__image" src="/images/twitch_purple.svg">
                        <h4 class="twitch-promo__headline">Live Now</h4>
                        <p class="twitch-promo__title">${data.title}</p>
                    </a>
                </div>
            `
            this.afterRender();
        }
    }
    afterRender() {
        this.closeButton = this.shadowRoot.querySelector('.twitch-promo__close-button');
        let element = this;
        this.closeButton.addEventListener('click', function(evt) {
            evt.preventDefault();

            element.remove();
        });
    }
}

if ('customElements' in window) {
    customElements.define('twitch-promo', TwitchPromo);
}