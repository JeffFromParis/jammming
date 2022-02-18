import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    render(){
        
        //for debug purposes
        this.props.tracks.map(track => {
            return console.log(`Track #${track.id}: ${track.name} from ${track.artist} on ${track.album}.`);
        });

        return (
            <div className="TrackList">
                {
                    this.props.tracks.map(track => {
                        return <Track track={track} key={track.id}/>
                    })
                }
            </div>
        );
    }
}

export default TrackList;