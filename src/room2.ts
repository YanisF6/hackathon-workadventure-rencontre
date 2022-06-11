/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let currentPopup1 : any = undefined;


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
                    WA.nav.goToRoom('../../map.json#fromInside');
                }
            },
            {
                label: "Boîte de nuit",
                className: "primary",
                callback: () => {
                    music.stop();
                    WA.nav.goToRoom('../maps/room.json');
                }
            }
        ]);
    })

    WA.room.onLeaveLayer('exitLayer').subscribe(closePopUp);

	WA.room.onEnterLayer('infoZone1').subscribe(() => {
        currentPopup1 = WA.ui.openPopup("infoRoomPopup",
            "Welcome to Love World",
        []);
    })

    WA.room.onLeaveLayer('infoZone1').subscribe(closePopUp1)

    // EVENTS DOORS

    WA.room.onEnterLayer('principalDoor').subscribe(() => {
        WA.room.hideLayer("thirdDoorClose");
    })
    
    WA.room.onLeaveLayer('principalDoor').subscribe(()=>{
        WA.room.showLayer("segondDoorClose");
    })
    
    WA.room.onEnterLayer('firstDoor').subscribe(() => {
        WA.room.hideLayer("firstDoorClose");
        
    })
    
    WA.room.onLeaveLayer('firstDoor').subscribe(()=>{
        WA.room.showLayer("firstDoorClose");
    })

    WA.room.onEnterLayer('segondDoor').subscribe(() => {
        WA.room.hideLayer("segondDoorClose");
    })
    
    WA.room.onLeaveLayer('segondDoor').subscribe(()=>{
        WA.room.showLayer("segondDoorClose");
    })

    WA.room.onEnterLayer('thirdDoor').subscribe(() => {
        WA.room.hideLayer("segondDoorClose");
    })
    
    WA.room.onLeaveLayer('thirdDoor').subscribe(()=>{
        WA.room.showLayer("thirdDoorClose");
    })

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

function closePopUp1(){
    if (currentPopup1 !== undefined) {
        currentPopup1.close();
        currentPopup1 = undefined;
    }
}

export {};
