/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);

    /** --- AUDIO --- */

    let ambience = WA.sound.loadSound("\./assets/sfx/sfx-nature_ambience.ogg");
    let music = WA.sound.loadSound("/assets/sfx/easy-lemon-by-kevin-macleod-from-filmmusic-io.mp3");
    let configSound = {
        volume: 0.1,
        loop: true,
        rate: 1,
        detune: 1,
        delay: 0,
        seek: 0,
        mute: false
    };
    let muted = false;
    
    ambience.play(configSound);
    music.play({
        ...configSound,
        volume: 0.2
    });

    /** MENU AUDIO */
    WA.ui.registerMenuCommand("Jouer / Couper la musique",
    {
        callback: () => {
            if(!muted) {
                ambience.stop();
                music.stop();
                muted = true;
            } else {
                ambience.play(configSound);
                music.play({ ...configSound, volume: 0.2 });
                muted = false;
            }
        }
    })

    /** ------ */

    /** --- DAY / NIGHT --- */

    const now = new Date();
    if(now.getHours() < 19)
        WA.room.hideLayer("nightSky");
    else
        WA.room.showLayer("nightSky");

    /** ------ */

    /** --- POPUP --- */

    /** INFO */
    WA.room.onEnterLayer('infoZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("infoPopup",
            "Choisis ta porte\n\nAubergine: Gay\nPoire : Lesbienne\nPomme : Hétéro\nCerise: Bisexuel\nTomate : Tout me va",
        []);
    })

    WA.room.onLeaveLayer('infoZone').subscribe(closePopUp)

    WA.room.onEnterLayer('exit').subscribe(() => {
        music.stop();
        ambience.stop();
    })

    /** GAY */
    WA.room.onEnterLayer('gayDoor').subscribe(() => {
        currentPopup = WA.ui.openPopup("gayDoorPopup",
            "Homme × Homme",
        [
            {
                label: "Bibliothèque",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/library/library-gay.json');
                    ambience.stop();
                    music.stop();
                }
            },   
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/nightclub/nightclub-gay.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Musée",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('../maps/museum/museum-gay.json');
                    ambience.stop();
                    music.stop();
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('gayDoor').subscribe(closePopUp);

    /** LESBIAN */
    WA.room.onEnterLayer('lesbianDoor').subscribe(() => {
        currentPopup = WA.ui.openPopup("lesbianDoorPopup",
            "Femme × Femme",
        [
            {
                label: "Bibliothèque",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/library/library-lesbian.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/nightclub/nightclub-lesbian.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Musée",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/museum/museum-lesbian.json');
                    ambience.stop();
                    music.stop();
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('lesbianDoor').subscribe(closePopUp);

    /** HETERO */
    WA.room.onEnterLayer('heteroDoor').subscribe(() => {
        currentPopup = WA.ui.openPopup("heteroDoorPopup",
            "Homme × Femme",
        [
            {
                label: "Bibliothèque",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/library/library-hetero.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/nightclub/nightclub-hetero.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Musée",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/museum/museum-hetero.json');
                    ambience.stop();
                    music.stop();
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('heteroDoor').subscribe(closePopUp);

    /** BISEXUAL */
    WA.room.onEnterLayer('bisexualDoor').subscribe(() => {
        currentPopup = WA.ui.openPopup("bisexualDoorPopup",
            "Homme ou Femme",
        [
            {
                label: "Bibliothèque",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/library/library-bi.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/nightclub/nightclub-bi.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Musée",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/museum/museum-bi.json');
                    ambience.stop();
                    music.stop();
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('bisexualDoor').subscribe(closePopUp);

    /** HETERO */
    WA.room.onEnterLayer('allDoor').subscribe(() => {
        currentPopup = WA.ui.openPopup("allDoorPopup",
            "Tout me va",
        [
            {
                label: "Bibliothèque",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/library/library-all.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/nightclub/nightclub-all.json');
                    ambience.stop();
                    music.stop();
                }
            },
            {
                label: "Musée",
                className: "primary",
                callback: () => {
                    WA.nav.goToRoom('./maps/museum/museum-all.json');
                    ambience.stop();
                    music.stop();
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('allDoor').subscribe(closePopUp);

    /** ------ */

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
