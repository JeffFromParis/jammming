import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.state = {
      searchResults: [
        {id: 1, name: "Haïti", artist: "Arcade Fire", album: "Funerals"},
        {id: 2, name: "No Surprises", artist: "Radiohead", album: "Ok Computer"},
        {id: 3, name: "Giorgio By Moroder", artist: "Daft Punk", album: "Random Access Memories"}
      ],
      playlistName: "Disco Hits",
      playlistTracks: [
        {id: 4, name: "Spacer", artist: "Sheila", album: "King of the World"},
        {id: 5, name: "Born To Be Alive", artist: "Patrick Hernandez", album: "Born To Be Alive"},
        {id: 6, name: "Stayin' Alive", artist: "The Bee Gees", album: "Saturday Night Fever"}
      ]
    };
  }
  
  //add a track to a playslit
  // that method is passed to the SearchResult component, then to the tracklist and finally to the track.
  addTrack(track){    
    let tracks = this.state.playlistTracks;

    //check if the track ID is already in the playlist
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }

    //adding the song to the playlist and updating the state
    tracks.push(track);
    this.setState({playlistTracks: tracks});
  }

  //remove a track from a playlist
  // that method is passed to the Playlist component, then to the tracklist and finally to the track.
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({playlistTracks: tracks});
  }

  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
