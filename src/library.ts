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
            `Vous êtes dans la bibliothèque "${
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
                label: "Musée",
                className: "primary",
                callback: () => {
                    music.stop();
                    WA.nav.goToRoom(`../museum/museum-${orient}.json#fromInside`);
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('exitLayer').subscribe(closePopUp);

    /** QUESTIONS */

    WA.room.onEnterLayer('questions/question1').subscribe(() => {
        currentPopup = WA.ui.openPopup("question1", "Quel est ton top 3 de tes livres préférés ?", []);
    });
    WA.room.onLeaveLayer('questions/question1').subscribe(closePopUp);

    WA.room.onEnterLayer('questions/question2').subscribe(() => {
        currentPopup = WA.ui.openPopup("question2", "Quel est le dernier livre que tu as lu ?", []);
    });
    WA.room.onLeaveLayer('questions/question2').subscribe(closePopUp);

    WA.room.onEnterLayer('questions/question3').subscribe(() => {
        currentPopup = WA.ui.openPopup("question3", "Quel est ton style de littérature ?", []);
    });
    WA.room.onLeaveLayer('questions/question3').subscribe(closePopUp);

    WA.room.onEnterLayer('questions/question4').subscribe(() => {
        currentPopup = WA.ui.openPopup("question4", "Quel est le prochain livre que tu comptes lire ?", []);
    });
    WA.room.onLeaveLayer('questions/question4').subscribe(closePopUp);

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
