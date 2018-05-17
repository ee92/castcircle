const AgoraRTC = window.AgoraRTC
const appid = "4a13170d702a497e8394d2c17618acf4"
let client, stream

function agora(channelName, host) {
  client = AgoraRTC.createClient({mode:'interop'})
  client.init(appid, () => {
    client.join(null, channelName, undefined, (uid) => {

      if (host) {
        let options = {
            streamID: uid,
            audio: true,
            video: true,
            screen: false,
        }
        stream = AgoraRTC.createStream(options)
        stream.init(() => {
          stream.play('agora')
          client.publish(stream)
        })
      } else {
        client.on('stream-added', function (evt) {
          var stream = evt.stream
          client.subscribe(stream)
        })

        client.on('stream-subscribed', function (evt) {
          var stream = evt.stream
          stream.play('agora')
        })
      }
    })
  })
}

export { agora }
