
document.getElementById('search-button').addEventListener('click', function(){
    document.getElementById('search-result').innerHTML = '';

    const lyricName = document.getElementById('search-lyric').value;
    fetch(`https://api.lyrics.ovh/suggest/${lyricName}`)
    .then(res => res.json())
    .then(data=>{
        fetchdata = data;

       for (let i = 0; i < data.data.length; i++) {
           const title = data.data[i].title;
           const artist = data.data[i].artist.name;
    
           document.getElementById('search-result').innerHTML +=
           `<div class="search-result col-md-8 mx-auto py-4">
           <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${title}</h3>
                            <p class="author lead">Album by ${artist}</p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button onclick = "getLyric(${i})" class="btn btn-success">Get Lyrics</button>
                        </div>
                    </div>
            </div>`;
            if(i == 9){
                break;
            }
       }
    })
});

function getLyric(index) {
    document.getElementById('lyric').innerHTML = "";
    const title = fetchdata.data[index].title;
    const artist = fetchdata.data[index].artist.name;

    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(res => res.json())
    .then(data =>{
       const lyric = data.lyrics;
       if (lyric =='') {
           alert("Lyrics not found");
       }
       document.getElementById('lyric').innerHTML =`<pre id = 'lyric'>${lyric}</pre>`;
       
    })
}