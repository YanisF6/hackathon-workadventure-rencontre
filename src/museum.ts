/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra, Properties } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
const map = await WA.room.getTiledMap();
const mapProperties = new Properties(map.properties);
const mapName = mapProperties.getString('mapName');
const orient = mapName?.split("-").pop();

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);


    /** SOUND */

    let pageFlip = WA.sound.loadSound("/assets/sfx/sfx--page_turn.ogg");
    let configSound = {
        volume: 0.1,
        loop: false,
        rate: 1,
        detune: 1,
        delay: 0,
        seek: 0,
        mute: false
    };
    pageFlip.play(configSound);
    let ambience = setInterval(() => pageFlip.play(configSound), 15000);

    let music = WA.sound.loadSound("/assets/sfx/windswept-by-kevin-macleod-from-filmmusic-io.mp3");
    music.play(configSound);

    let muted = false;

    /** MENU AUDIO */
    WA.ui.registerMenuCommand("Jouer / Couper la musique",
    {
        callback: () => {
            if(!muted) {
                clearInterval(ambience);
                music.stop();
                muted = true;
            } else {
                ambience = setInterval(() => pageFlip.play(configSound), 15000);
                music.play(configSound);
                muted = false;
            }
        }
    })

    /** EVENTS */

    WA.room.onEnterLayer('exitLayer').subscribe(() => {
        currentPopup = WA.ui.openPopup("exitPopup",
            `Vous êtes au musée "${
                orient === "hetero" ? "Homme × Femme"
                : orient === "gay" ? "Homme × Homme"
                : orient === "lesbian" ? "Femme × Femme"
                : orient === "bi" ? "Homme ou Femme"
                : orient === "all" ? "Tous"
                : "???"
            }"`,
        [
            {
                label: "Retourner à l'accueil",
                className: "normal",
                callback: () => {
                    music.stop();
                    WA.nav.goToRoom('../../map.json#fromInside');
                }
            },
            {
                label: "Aller à la boîte de nuit",
                className: "primary",
                callback: () => {
                    music.stop();
                    WA.nav.goToRoom(`../maps/nightClub/nightClub-${orient}.json`);
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('exitLayer').subscribe(closePopUp);


    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
