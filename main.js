const script = document.createElement('script')
script.innerText = "if (true) {\n  const LOCKER = {};\n  const props = [\"WebSocket\", \"RTCPeerConnection\"];\n  props.map(prop => {\n    LOCKER[prop] = window[prop].bind({});\n    Object.defineProperty(window, prop, {\n      get: () => {\n        const err = new Error();\n        if(window.confirm(`${err.stack} would like to access ${prop}. Continue?`)) {\n          return LOCKER[prop];\n        }\n      }\n    })\n\n  })\n}\n\n\n"

document.body.appendChild(script)
