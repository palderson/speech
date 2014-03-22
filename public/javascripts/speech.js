var final_transcript = '';
var recognizing = false;
var ignore_onend;
var start_timestamp;

var recognition = new webkitSpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;

recognition.onstart = function() {
  recognizing = true;
  start_img.src = '/images/mic-animate.gif';
};

recognition.onerror = function(event) {
  if (event.error == 'no-speech') {
    start_img.src = '/images/mic.gif';
    ignore_onend = true;
  }
  if (event.error == 'audio-capture') {
    start_img.src = '/images/mic.gif';
    ignore_onend = true;
  }
  if (event.error == 'not-allowed') {
    ignore_onend = true;
  }
};

recognition.onend = function() {
  recognizing = false;
  if (ignore_onend) {
    return;
  }
  start_img.src = '/images/mic.gif';
};

recognition.onresult = function(event) {
  var interim_transcript = '';
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      final_transcript = event.results[i][0].transcript;
      final_span.innerHTML = final_transcript;
      $(final_span).trigger('change');
    } else {
      interim_transcript += event.results[i][0].transcript;
    }
  }
  interim_span.innerHTML = interim_transcript;
  };

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  final_transcript = '';
  recognition.lang = 'en-US';
  recognition.start();
  ignore_onend = false;
  final_span.innerHTML = '';
  interim_span.innerHTML = '';
  start_img.src = '/images/mic-slash.gif';
  start_timestamp = event.timeStamp;
}
