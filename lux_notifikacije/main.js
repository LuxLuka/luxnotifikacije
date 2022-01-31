var announceTimer = {}
var announceInProgress = {}
var floatInProgress = false
var sound = false

function notificationDisplay(id) {
    $("#notification" + id).css('display', 'block')
    setTimeout(function() {$("#notification" + id).addClass('pop')} ,200);
}

function notificationPop(icon, msg, ms, id) {
  $("#notification-container").append(`
      <div class="notification my-2" id="notification`+id+`">
      <div class="notify-circle-btn `+icon+`"
        <li id="notification-icon`+id+`"></li>
      </div>
        <span>`+msg+`</span>
      </div>
  `).show('slow')
  notificationDisplay(id)
  setTimeout(function() {
      $("#notification" + id).removeClass('pop');
      setTimeout(()=>{$("#notification"+id).remove()}, 1000)
    }, ms);
}

function createAnnounce(type, announcer, text, ms) {
    $("#announce-" + type).html('')
    $("#announce-" + type).show();
    $("#announce-" + type).append(`
        <div class="">
            `+((type == 'center') ? '<span><strong>SERVER OBAVESTENJE</strong></span>' : '<i class="fas fa-info-circle"></i> <strong>OBAVESTENJE!</strong>')+`
            `+((type == 'center') ? '' :  '<span>' + announcer + '</span>') +`
            <p>`+ text +`</p>
        </div>
    `)
    let audio = new Audio('drip.ogg');
    audio.volume = 0.2;
    audio.play();
    setTimeout(function() {
        $("#announce-" + type).hide('');
        $("#announce-" + type).html('');
    }, ms)
}

function createFloatingText(text) {
    $("#floating-text").html('');
    $("#floating-text").show();
    $("#floating-text").append(`
        <a class="circle">
            <i class="fas fa-info-circle"></i>
        </a>
        <p>`+ text +`</p>
    `)
    if (sound) {
        let audio = new Audio('notification.ogg');
        audio.volume = 0.2;
        audio.play();  
    } 
}

function clearFloatingText() {
    $("#floating-text").html('')
    $("#floating-text").hide();
}

function createBar(text, ms) {
    $("#bar").html('')
    $("#bar").show()
    $("#bar").append(`
        <span class="progress-bar-txt">`+ text +`</span>
        <div class="percentage progress-circle" id="percent">
            <span class="percent-txt">0%</span>
            <svg class="polygon" xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6">
                <path id="Polygon_1" data-name="Polygon 1" d="M4,0,8,6H0Z" transform="translate(8 6) rotate(180)" fill="#5466dd"/>
            </svg>  
        </div>
        <div class="load" id="load-bar"></div>
    `)
    let audio = new Audio('notification.ogg');
    audio.volume = 0.1;
    audio.play(); 
    var start = new Date();
    var timeoutVal = Math.floor(ms / 100)
    animate();

    function animate() {
        var now = new Date();
        var timeDiff = now.getTime() - start.getTime();
        var perc = Math.round( (timeDiff / ms) * 100 )
        if (perc <= 100) {
            document.getElementById('load-bar').style.width = perc + '%'
            document.getElementById('percent').style.left = perc + '%'
            $(".percent-txt").html(perc + "%")
            setTimeout(animate, timeoutVal);
        } else $("#bar").hide();
    }
}


function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

window.addEventListener('message', function(event)
{ 
    var item = event.data;
    switch(item.action) {
        case 'showFloatingText':
            createFloatingText(item.text)
            return;
        case 'hideFloatingText':
            clearFloatingText()
            return;
        case 'sendAnnounce':
            createAnnounce(item.type, item.announcer, item.text, item.ms)
            return;
        case 'send-notification':
            notificationPop(item.icon, item.msg, item.ms, guidGenerator())
            return;
        case 'createProgressBar':
            createBar(item.text, item.ms)
            return;
        case 'updateSound':
            sound = item.sound
            return;
        default:
            return;
    }
});