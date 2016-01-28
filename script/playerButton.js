
function playerButton(){

    var playerDiv = $("#playerDiv");

    //vérification de l'état de la musique
    function getMusicState(){
        return musicState;
    }
    function  getPlayerType(){
        return playerType;
    }
    this.play = function(){
        if(!getMusicState() == musicStates.pause)
            return;

        if(!getPlayerType() == playerTypes.error)
            return;

        if(getPlayerType() == playerTypes.youtube)
            Youtube.playPlayer();

        if(getPlayerType() == playerTypes.soundcloud)
            soundcloud.playPlayer();
    };
    this.pause = function(){
        if(!getMusicState() == musicStates.play)
            return;

        if(!getPlayerType() == playerTypes.error)
            return;

        if(getPlayerType() == playerTypes.youtube)
            Youtube.pausePlayer();

        if(getPlayerType() == playerTypes.soundcloud)
            soundcloud.pausePlayer();
    };
    this.stop = function(){
        if(!(getMusicState() == musicStates.pause || getMusicState() == musicStates.play))
            return;

        if(!getPlayerType() == playerTypes.error)
            return;

        playerDiv.empty();
    };
    this.displayPause = function(){

    };
    this.displayPlay = function(){

    };
    this.displayStop = function(){

    };

}
var playerBtn = new playerButton();