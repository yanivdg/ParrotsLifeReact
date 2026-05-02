const startTime = 25;
    const endTime = 80;
    let player;

    function onYouTubeIframeAPIReady() {
      const r = Math.floor(Math.random() * 2);
      const selectedId = setMovieId(r);

      player = new YT.Player('player', {
        height: window.innerHeight,
        width: window.innerWidth,
        videoId: selectedId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 0,             // Change to 0: we will loop manually to stay under the radar
          start: startTime,
          end: endTime,
          // playlist: selectedId, // REMOVE THIS: Playlists trigger ads more often
          modestbranding: 1,
          fs: 0,
          iv_load_policy: 3,
          autohide: 1,
          rel: 0,              // Don't show related videos
          enablejsapi: 1,
          origin: window.location.origin, // Helps verify the request is legitimate
          mute: 1
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange
        }
      });
    }

    function onPlayerReady(event) {
      event.target.playVideo();
      
      // THE FIX: Check time every half-second. 
      // If we seek back BEFORE it ends, we often dodge the "End Screen" ads.
      setInterval(() => {
        if (player && typeof player.getCurrentTime === 'function') {
          const currentTime = player.getCurrentTime();
          if (currentTime >= endTime - 0.5) { 
            player.seekTo(startTime);
          }
        }
      }, 500);
    }

    function setMovieId(flag) {
      return flag == 0 ? 'RWJGj4Xp_do' : 'c7ox2DYLdgo';
    }

    function onPlayerStateChange(event) {
      // If an ad forces the video to end, or it hits the end naturally, loop it.
      if (event.data === YT.PlayerState.ENDED) {
        player.seekTo(startTime);
        player.playVideo();
      }
    }
