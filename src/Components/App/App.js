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
        {
          id: 1,
          name: "Haïti",
          artist: "Arcade Fire",
          album: "Funerals"
        },
        {
          id: 2,
          name: "No Surprises",
          artist: "Radiohead",
          album: "Ok Computer"
        },
        {
          id: 3,
          name: "Giorgio By Moroder",
          artist: "Daft Punk",
          album: "Random Access Memories"
        }
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
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
