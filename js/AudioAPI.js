const navigator = window.navigator
    navigator.getUserMedia = navigator.getUserMedia ||
                              navigator.webkitGetUserMedia ||
                              navigator.mozGetUserMedia ||
                              navigator.msGetUserMedia
    const AudioContext = window.AudioContext ||
                          window.webkitAudioContext
    const isSupport = !!(navigator.getUserMedia && AudioContext)
    const context = isSupport && new AudioContext()
    var AudioApi = window.AudioApi = function(){

    }
    function start(){
            // https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext AudioContent API
        return new Promise((resolve, reject) => {
         navigator.getUserMedia({audio: true}, stream => { // 申请浏览器麦克风权限
        const source = context.createMediaStreamSource(stream)
        // 该对象可以获得声音的频率数据 https://developer.mozilla.org/zh-CN/docs/Web/API/AudioContext/createAnalyser
        const analyser = context.createAnalyser()
        source.connect(analyser)
        analyser.fftSize = 2048
        resolve(analyser)
         }, () => {
        reject()
         })
        })
        }
    function getVoiceSize(analyser){
        const dataArray = new Uint8Array(analyser.frequencyBinCount)
        // 这里会获得一个数组，数字的下标表示频率，数组的值表示频率波大小
        // 通过对这些值的一个简单累加，就可以得到一个数字，用于游戏中表示声音的大小
        analyser.getByteFrequencyData(dataArray)
        const data = dataArray.slice(100, 1000)  // 只获得 100 - 1000Hz 的声音频率大小
        const sum = data.reduce((a, b) => a + b)  // 将这些值累加
        return sum
    }