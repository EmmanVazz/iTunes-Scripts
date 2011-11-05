/* 	Rename me to NoArtPlaylist.js
	Double Click in Explorer to run

Script by Otto - http://ottodestruct.com       */

var iTunesApp = WScript.CreateObject("iTunes.Application"); 
var tracks = iTunesApp.LibraryPlaylist.Tracks;
var numTracks = tracks.Count;
var i;
NoArtPlaylist = iTunesApp.CreatePlaylist("One Stars");
var	OneStar = new Array();
var Output="Going to delete the Followin: \n";
var index = 0;
var fs = new ActiveXObject("Scripting.FileSystemObject");
var wshShell = WScript.CreateObject("WScript.Shell");
for (i = 1; i <= numTracks; i++) 
{ 	
	var currTrack = tracks.Item(i); 
	if ( currTrack.Rating == 20 ) 
		{
		OneStar[index]=currTrack;
		index++;
		NoArtPlaylist.AddTrack(currTrack);
		}
} 
for (i = 0; i < index; i++) 
{
	Output = Output + OneStar[i].Name + " by " + OneStar[i].Artist+ "\n";
}
var btn = wshShell.Popup(Output, 60, "Do you want to delete these tracks:", 0x4 + 0x20);
switch(btn) {
    // Yes button pressed.
    case 6:
        WScript.Echo("Deleting Tracks");
	for (i = index-1; i >= 0; i--) 
	{
	fs.DeleteFile(OneStar[i].Location);
	OneStar[i].Delete();
	}
        break;
    // No button pressed.
    case 7:
        WScript.Echo("Check iTunes then.");
        break;
    // Timed out.
    case -1:
       WScript.Echo("Is there anybody out there?");
       break;
}
