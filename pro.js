
//
// add the passed in playlist change to the end of the mixtape
// 
function addPlaylist( mixtape,  change )
{
  
   var newPlaylist = {
     id : mixtape.playlists.length+1,
     user_id : change.playlist.user_id,
     song_ids: change.playlist.song_ids
   }
   mixtape.playlists.push(newPlaylist);
   
}


//
// Remove the pass in chage playlist id from the list and renumber
// the ids of all subsequent playlists
//
function removePlaylist( mixtape, change )
{
    if ( change.playlistId > mixtape.playlists.length )
    {
        console.log( "Playlist with id '"+change.playlistId+"' does not exists");
        return;
    }
 
    var idx = parseInt( change.playlistId, 10);
    var x = mixtape.playlists.splice(idx-1,1);
    for( var x = idx -1; x < mixtape.playlists.length; x++ )
    {
        mixtape.playlists[x].id=x+1;
    }
    
}

//
// Add the passed in song to the passed in playlist, 
// This method assume that you may want the same song more 
// than once in a playlist
//
function addSongToPlaylist( mixtape, change )
{

    if ( change.playlistId > mixtape.playlists.length )
    {
        console.log( "Playlist with id '"+change.playlistId+"' does not exists");
        return;
    }

    if ( change.songId > mixtape.songs.length )
    {
        console.log( "Song with id '"+change.songId+"' does not exists");
        return;
    }
    

    mixtape.playlists[change.playlistId-1].song_ids.push(change.songId);

}


// main code starts
const fs = require('fs');

var args = process.argv.slice(2);


if ( process.argv.length != 4 )
{
    console.log( process.argv[1] + "requires 2 arguments");
    process.exit(1);
}


try {
    var mixtapeData = fs.readFileSync(process.argv[2]); 
} catch(e) {
    console.log("Cannot open input file:"+process.argv[2]);
    process.exit(1);
}

try {
    var changesData = fs.readFileSync(process.argv[3]); 
} catch(e) {
    console.log("Cannot open input file:"+process.argv[3]);
    process.exit(1);
}

var mixtape = JSON.parse(mixtapeData);

var changes = JSON.parse(changesData);


changes.forEach(function(change)
{
    if ( change.action === 'addPlaylist')
    {
        addPlaylist( mixtape, change );
    }
    else if ( change.action === 'removePlaylist')
    {
        removePlaylist( mixtape, change );
    }
    else if ( change.action === 'addSongToPlaylist' )
    {
        addSongToPlaylist( mixtape, change )
    }
    else
    {
        console.log("unknown action:"+change.action);
    }
});

console.log( JSON.stringify(mixtape,null,4) );

