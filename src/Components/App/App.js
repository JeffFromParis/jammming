import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      searchResults: [
        {id: 1, name: "Haïti", artist: "Arcade Fire", album: "Funerals"},
        {id: 2, name: "No Surprises", artist: "Radiohead", album: "Ok Computer"},
        {id: 3, name: "Giorgio By Moroder", artist: "Daft Punk", album: "Random Access Memories"}
      ],
      playlistName: "Disco Hits",
      playlistTracks: [
        {id: 1, name: "Spacer", artist: "Sheila", album: "King of the World"},
        {id: 2, name: "Born To Be Alive", artist: "Patrick Hernandez", album: "Born To Be Alive"},
        {id: 3, name: "Stayin' Alive", artist: "The Bee Gees", album: "Saturday Night Fever"}
      ]
    };
  }
  
  render(){
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
