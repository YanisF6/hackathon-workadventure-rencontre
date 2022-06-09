/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;
let currentPopup1 : any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    // Popup
    WA.room.onEnterLayer('infoZone').subscribe(() => {
        currentPopup = WA.ui.openPopup("infoPopup",
            "Welcome to WorkAdventure's dating map !\nEggplant: Gay\nPear : Lesbian\nApple : Hetero\nCherry: Bisexual\nTomato : I love everyone",
        []);
    })

    WA.room.onEnterLayer('infoZone1').subscribe(() => {
        currentPopup1 = WA.ui.openPopup("infoRoomPopup",
            "Welcome to Hetero Room",
        []);
    })

    WA.room.onLeaveLayer('infoZone').subscribe(closePopUp)
    WA.room.onLeaveLayer('infoZone1').subscribe(closePopUp1)

    // Animation Door
    WA.room.onEnterLayer('firstDoor').subscribe(() => {
        WA.room.hideLayer("firstDoorClose");
        
    })
    
    WA.room.onLeaveLayer('firstDoor').subscribe(()=>{
        WA.room.showLayer("firstDoorClose");
    })

    WA.room.onEnterLayer('SegondDoor').subscribe(() => {
        WA.room.hideLayer("SegondDoorClose");
        
    })
    
    WA.room.onLeaveLayer('SegondDoor').subscribe(()=>{
        WA.room.showLayer("SegondDoorClose");
    })

    // TEST SOUND (WIP)
    var mySound = WA.sound.loadSound("Sound.ogg");
    var config = {
        volume : 0.5,
        loop : false,
        rate : 1,
        detune : 1,
        delay : 0,
        seek : 0,
        mute : false
    }
    mySound.play(config);


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
