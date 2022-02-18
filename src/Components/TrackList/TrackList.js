import React from 'react';
import './TrackList.css';

class TrackList extends React.Component{
    render(){
        return(
            <div className="TrackList">
                <ul>
                    <li>Song 1</li>
                    <li>Song 2</li>
                    <li>Song 3</li>
                </ul>
            </div>
        );
    }
}

export default TrackList;