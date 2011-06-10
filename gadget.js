// ------------------------------------------------------
// Copyright (C) 2007 Oekosoft
// ------------------------------------------------------

// ------------------------------------------------------
// Gadget
// ------------------------------------------------------

function pageLoad() {
    System.Gadget.settingsUI = 'settings.html';
    System.Gadget.onSettingsClosed = settingsClosed; 
         
    var myurl = System.Gadget.Settings.readString("webCamUrl");
    if (myurl == "") {
          myurl = 'http://meteoinfo.by/radar/UMMN/UMMN_latest.png';
          System.Gadget.Settings.writeString("webCamUrl", myurl);
    }
    myurl = myurl+"?"+new Date().getTime();

    var mydiv = document.getElementById('gadget');
    mydiv.innerHTML = "<a href='"+myurl+"'><img id='photo' src='"+myurl+"' class='layer' border=0></a>";

    startTimeout();
 }

function settingsClosed(p_event) {
    pageLoad();
}

function eraseTimeout() {
    clearTimeout (isTiming);
    isTiming = false;
}

function startTimeout() {
    var myrefresh = System.Gadget.Settings.readString("refreshTime");
    if (myrefresh == "") {
          myrefresh = '300';
          System.Gadget.Settings.writeString("refreshTime", myrefresh);
    }
    isTiming = setTimeout("refresh()", myrefresh*1000);
}

function refresh() {
    eraseTimeout();
    pageLoad();
}

// ------------------------------------------------------
// Settings
// ------------------------------------------------------


function loadSettings()
{
    System.Gadget.onSettingsClosing = settingsClosing; 
    var currentSetting = System.Gadget.Settings.readString("webCamUrl");
    if (currentSetting != "") {
        webUrl.innerText = currentSetting;
    }
    currentSetting = System.Gadget.Settings.readString("refreshTime");
    if (currentSetting != "") {
        refreshTime.innerText = currentSetting;
    }
}

function settingsClosing(event)
{
    if (event.closeAction == event.Action.commit) {
        System.Gadget.Settings.writeString("webCamUrl", webUrl.value);
        System.Gadget.Settings.writeString("refreshTime", refreshTime.value);
    }
}

