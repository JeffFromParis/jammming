const cliendId = 'b69c1a3f376e48288429c2e90805f8bf';
// const redirectURI = 'http://localhost:3000/';
// const redirectURI = 'http://jammming_by_jeff.surge.sh';
const redirectURI = 'http://jammming-by-jeff-vergne.netlify.app';

let accessToken;

const Spotify = {
    
    getAccessToken(){
        //Check if the user’s access token is already set. If it is, return the value saved to access token.
        if(accessToken){
            return accessToken;
        }
        
        //If the access token is not already set, check the URL to see if it has just been obtained.
        //'window.location.href' stores the URL of the current webpage.
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if(accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            
            //This clears the parameters, allowing us to grab a new access token when it expires.
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${cliendId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }
    },
    
    search(term){
        console.log('Start of the spotify search method');

        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,
            {headers: 
                {Authorization: `Bearer ${accessToken}`}
            }
        ).then(response => {
            return response.json();
        }).then(jsonResponse => {
            //in case the json does not contain any track
            if(!jsonResponse.tracks){
                return {};
            }

            return jsonResponse.tracks.items.map(track => (
                {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri
                }
            ));
        })
    },

    savePlaylist(name, trackUris){
        if (!name || !trackUris.length){
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}`};
        let userId;

        return fetch('https://api.spotify.com/v1/me',{headers: headers}
        ).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: name})
            }).then(response => response.json()
            ).then(jsonResponse => {
                const playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
                {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: trackUris})
                })
            })
        })
    }
}

export default Spotify;