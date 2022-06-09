/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('infoZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("infoPopup",
            "Welcome to WorkAdventure's dating map !\nEggplant: Gay\nPear : Lesbian\nApple : Hetero\nCherry: Bisexual\nTomato : I love everyone",
        []);
    })

    // WA.room.onEnterLayer('infoZone').subscribe(() => {
    //     currentPopup = WA.ui.openPopup("infoRoomPopup",
    //         "Welcome to Hetero\nCherry Room",
    //     []);
    // })

    WA.room.onLeaveLayer('infoZone').subscribe(closePopUp)

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
