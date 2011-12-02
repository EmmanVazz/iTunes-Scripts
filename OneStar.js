/* 	OneStar.js
	This Script searches all your library for songs with a rating of one star.
	Then it display a list of them and asks if you want to remove them.
	If you choose to remove them it will delete the source file of the song.

		Written by Emmanuel Vazquez 
		Sept 2011
*/

/*
Interaction with iTunes Application. 
*/
var iTunesApp = WScript.CreateObject("iTunes.Application"); 
var tracks = iTunesApp.LibraryPlaylist.Tracks;
/*
Declerations of things used in the script.
*/
var numTracks = tracks.Count;
var i;
var	OneStar = new Array();
var Output="Going to delete the Following: \n";
var index = 0;
var fs = new ActiveXObject("Scripting.FileSystemObject");
var wshShell = WScript.CreateObject("WScript.Shell");

/*
This finds all the One Star Songs in your iTunes Library and saves them in an array
*/
for (i = 1; i <= numTracks; i++) 
{ 	
	var currTrack = tracks.Item(i); 
	if ( currTrack.Rating == 20 ) 
		{
		OneStar[index]=currTrack;
		index++;
		}
} 
/*
This formats all the songs in the arrays info in a readable fashion.
It basically makes all the info into one big string.
*/
for (i = 0; i < index; i++) 
{
	Output = Output + OneStar[i].Name + " by " + OneStar[i].Artist+ "\n";
}
/*
This takes care of displaying all the songs in the array(aka. that big string I just created).
Gives the options yes or no.
*/
var btn = wshShell.Popup(Output, 60, "Do you want to delete these tracks:", 0x4 + 0x20);
switch(btn) {
	//Yes button pressed. This means user wants to delete tracks. So it goes through the array and deletes the files.
    case 6:
        WScript.Echo("Deleting Tracks");
	for (i = index-1; i >= 0; i--) 
	{
	fs.DeleteFile(OneStar[i].Location);
	OneStar[i].Delete();
	}
        break;
    // No button pressed. This means the user doesn't want to delete the tracks.
    case 7:
        WScript.Echo("Check iTunes then.");
        break;
    // Timed out. 
    case -1:
       WScript.Echo("Is there anybody out there?");
       break;
}
