
(function(){
    var startTime, latency;

    var fpscounter = document.getElementById('FPScounter');
    var pingcounter = document.getElementById('Pingcounter');

    function updateUI() {
    
        updateFPScounter();
    
        requestAnimationFrame(updateUI);
    };
    
    function updateFPScounter(){
        var fr = 1/Time.deltaTime;
        if(fr){
            fpscounter.innerHTML = "FPS: "+ Math.round(fr);
        }
    }   

    setInterval(function() {
        startTime = Date.now();
        socket.emit('ping');
      }, 300);
      
    socket.on('pong', function() {
        latency = Date.now() - startTime;
        pingcounter.innerHTML = "Ping: " + latency;
    });
    
    requestAnimationFrame(updateUI)
})()
