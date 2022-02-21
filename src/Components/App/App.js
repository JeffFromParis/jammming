import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component{
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      searchResults: [
        // {id: 1, name: "Haïti", artist: "Arcade Fire", album: "Funerals"},
        // {id: 2, name: "No Surprises", artist: "Radiohead", album: "Ok Computer"},
        // {id: 3, name: "Giorgio By Moroder", artist: "Daft Punk", album: "Random Access Memories"}
      ],
      playlistName: "New Playlist",
      playlistTracks: [
        // {id: 4, name: "Spacer", artist: "Sheila", album: "King of the World"},
        // {id: 5, name: "Born To Be Alive", artist: "Patrick Hernandez", album: "Born To Be Alive"},
        // {id: 6, name: "Stayin' Alive", artist: "The Bee Gees", album: "Saturday Night Fever"}
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

  //Change the name of a playlist by modifying the input field of the playlist component
  updatePlaylistName(name){
    console.log('Playlist name has been modified by user.');
    this.setState({playlistName: name});
  }

  //save a playlist to a spotify user account
  savePlaylist(){
    // alert('This method is linked to the button correctly');
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName,trackUris).then(()=>{
      alert(`the playlist "${this.state.playlistName}" has been added to your spotify account."`);
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      });
      console.log(`the playlist name has been reset to "${this.state.playlistName}".`);
    })
  }

  //Hook up Search Bar to Spotify Search
  search(term){
    console.log(`Starting spotify search corresponding to the term "${term}".`);
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults});
    });
  }


  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar 
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults 
              searchResults={this.state.searchResults} 
              onAdd={this.addTrack}
            />
            <Playlist 
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
