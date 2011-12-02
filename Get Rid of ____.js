/* 	Get Rid of ____.js
	This Script searches all your library for unrated songs with the same artist as the current playing song in iTunes.
	Then it creates a playlist names "Get Rid of (The Artist's Name)" that mixes that artist's unrated songs with random ones in  the "Rated 5" playlist.
	So this would basically mix the selected artists unrated songs with songs that you all said that you enjoy.
	This helps with listening and rating artists that you never paid attention to in your library. 

	REQUIRED TO HAVE A PLAYLIST NAMED "Rated 5". THIS IS SUPPOSE TO HAVE SONGS THAT YOU LIKE. In my case songs that I rate them 5 starts.
	
	
	Ex.
	Get Rid of Adele
	
	1. Dirty Heads - Believe (randomly picked from Rated 5)
	2. Adele - Somelike You
	3. Drake- Take Care (randomly picked from Rated 5)
	4. Adele - DayDreamer
	5. Maxwell - Cold (randomly picked from Rated 5)
	6. Adele - Crazy for you
	 and so on till your library doesn't have more of that artist's songs
	
		Written by Emmanuel Vazquez 
		Sept 2011
*/

/*
Interaction with iTunes Application. 
*/
var iTunes = WScript.CreateObject("iTunes.Application"); 
var Lists=iTunes.Sources.Item(1).Playlists;
/*
Declerations of things used in the script.
*/
var tracks = iTunes.LibraryPlaylist.Tracks;
var numTracks = tracks.Count;
var Top_Rated;
var currTrack = iTunes.CurrentTrack;
var Person=currTrack.Artist;
NoArtPlaylist = iTunes.CreatePlaylist("Get Rid of " + Person);//Creates new playlist
/*
This find the "Rated 5" playlist in your library
*/
for (var i = 1; i<=Lists.Count; i++)
{
	if(Lists.Item(i).Name == "Rated 5")
		{
			Top_Rated= Lists.Item(i);
		}
}
/*
Initally adds the first random song from "Rated 5" 
*/
var GoodTracks=Top_Rated.Tracks;
NoArtPlaylist.AddTrack(GoodTracks.Item(Math.ceil(GoodTracks.Count * Math.random())));
/*
Finds tracks with the same artist as the current playing song and that are unrated. When it finds one 
it adds it and also adds a random songs from "Rated 5".
*/
for (i = 1; i <= numTracks; i++) 
{ 	
	var inlistTrack = tracks.Item(i); 
	if ( inlistTrack.Rating == 0 && inlistTrack.Artist == Person ) 
		{
		NoArtPlaylist.AddTrack(inlistTrack);
		NoArtPlaylist.AddTrack(GoodTracks.Item(Math.ceil(GoodTracks.Count * Math.random())));
		}
} 