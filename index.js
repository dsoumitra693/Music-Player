let btn = document.getElementById('btn');
let audio = document.getElementById('audio');
let prev_btn = document.getElementById('prev');
let play_btn = document.getElementById('play');
let next_btn = document.getElementById('next');
let img = document.getElementById('img');
let song_name = document.getElementById('song_name');
let singer = document.getElementById('singer');
let current_time = document.getElementById('current_time');
let song_duration = document.getElementById('song_duration');
let progress_bar = document.getElementById('progress_bar');
let progress = document.querySelector('.progress');
let _play = document.querySelector('.play');
let _pause = document.querySelector('.pause');
let songs = [
				{				name: 'Waalian',
								singer: 'Harnoor',
								imgSrc: null,
				},
				{
								name: 'Akh Lad Jaave',
								singer: 'Badsha, Jubin Nautial',
								imgSrc: null,
				},
				{
								name: 'Desi bangdi',
								singer: 'Unknown',
								imgSrc: null,
				},
				{				name: 'Camera wale instrumental',
								singer: 'Unknown',
								imgSrc: null,
				},
				
]
let song_index = 0;
let isPlaying = false;

function play() {
				audio.play();	
				isPlaying = true;
				_play.style.display = 'none';
				_pause.style.display = 'grid';
				_pause.style.left = '0.5vh';				
}
function pause() {
				audio.pause();
				isPlaying = false;
			  _play.style.display = 'grid';
				_pause.style.display = 'none';
				_play.style.left = '0.5vh';
}


function load_song(song) {
				audio.src = `Audio/${song.name}.mp3`;
				let src = (song.imgSrc == null) ? "default.jpg" : song.imgSrc;
				img.src = `Images/${src}`;
				song_name.innerText = song.name;
				singer.innerText = song.singer;
}
load_song(songs[song_index]);

function prev() {
			song_index = songs.length - (songs.length - song_index) % songs.length - 1;
				load_song(songs[song_index]);
				play();					
}

function next() {
				song_index = (song_index + 1) % songs.length
				load_song(songs[song_index]);
				play();				
}


prev_btn.onclick = prev;
play_btn.onclick = function () {
				if(isPlaying) {
								pause();
				}else {
							  play();
				}
}
next_btn.onclick = next;

audio.addEventListener("timeupdate", (e)=>{
				let currenttime = e.target.currentTime;
				duration = e.target.duration;
				
				if(currenttime == duration) next();
				if(duration == NaN) duration = 0
				
				let second1 = (currenttime%60 < 10) ? `0${Math.floor(currenttime%60)}` : Math.floor(currenttime%60);
				second2 = (duration%60 < 10) ? `0${Math.floor(duration%60)}` : Math.floor(duration%60);
				
				current_time.innerText = `${Math.floor(currenttime/60)}:${second1}`;
				song_duration.innerText = `${Math.floor(duration/60)}:${second2}`;
				
				progress_bar.style.width = `${currenttime / duration * 100}%`;				

progress.addEventListener("click", (ev)=>{
      progress_bar.style.width = `${ev.offsetX / 180 * 100}%`;	
				e.target.currentTime = ev.offsetX / 180 * duration;
})
})
