/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

let currentPopup: any = undefined;
console.log('Script started successfully');


// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags);

      /** INFO */
      WA.room.onEnterLayer('vipZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("vipCodePopup",
            "Le code d'accès VIP est 7894",
        []);
    })

    WA.room.onLeaveLayer('vipZone').subscribe(closePopUp);

    /** AUDIO */

    var mySound = WA.sound.loadSound("/assets/sfx/nightclub.mp3");
    var config = {
        volume : 1,
        loop : false,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }
    mySound.play(config);

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra()

}).catch(e => console.error(e));

function closePopUp(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};