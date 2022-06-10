/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

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
    setInterval(() => pageFlip.play(configSound), 15000);

    let music = WA.sound.loadSound("/assets/sfx/windswept-by-kevin-macleod-from-filmmusic-io.mp3");
    music.play(configSound);

    let muted = false;

    /** MENU AUDIO */
    WA.ui.registerMenuCommand("Jouer / Couper la musique",
    {
        callback: () => {
            if(!muted) {
                pageFlip.stop();
                music.stop();
                muted = true;
            } else {
                pageFlip.play(configSound);
                music.play(configSound);
                muted = false;
            }
        }
    })

    /** EVENTS */

    WA.room.onEnterLayer('exitLayer').subscribe(() => {
        currentPopup = WA.ui.openPopup("exitPopup",
            "Vous êtes dans la bibliothèque \"Homme × Femme\"",
        [
            {
                label: "Retourner à l'accueil",
                className: "normal",
                callback: () => {
                    music.stop();
                    WA.nav.goToRoom('../map.json#fromInside');
                }
            },
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    music.stop();
                    WA.nav.goToRoom('./maps/room.json');
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
