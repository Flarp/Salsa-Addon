if (true) {
  const LOCKER = {};
  const props = ["WebSocket", "RTCPeerConnection"];
  props.map(prop => {
    LOCKER[prop] = window[prop].bind({});
    Object.defineProperty(window, prop, {
      get: () => {
        const err = new Error();
        if(window.confirm(`${err.stack} would like to access ${prop}. Continue?`)) {
          return LOCKER[prop];
        }
      }
    })

  })
}


