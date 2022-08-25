
import { IXObjectData, XObjectPack } from "./src/XObject"
import {Xpell as _x} from "./src/Xpell"
import {XData} from "./src/XData"
import {X3D, X3DObject} from "./src/X3D/X3D"
import {XLabel} from "./src/XUI/XUICoreObjects"
import {XGLTFLoader as _gltf,GLTFEvents} from "./src/X3D/XGLTFLoader"

import { XUI } from "./src/XUI/XUI"
import { XUIObject } from "./src/XUI/XUIObject"
import XJoystick from "./src/XUI/XJoystick"
import {TopBar} from "./src/XUI/XDashboard"

//display Xpell engine info
_x.info()

//load Xpell UI (XUI) Module
_x.loadModule(XUI)
_x.loadModule(X3D)
XUI.importObject("joystick",XJoystick)

_x.start()




const world = {
    "html-tag-id": "x3d-player",
    scene: {
        "lights": {
            "main": {
                _type: "light",
                _light: "ambient",
                color: 0x444466
            },
            "p1": {
                _type: "light",
                _light: "directional",
                _helper: true,
                color: "hsl(200, 100%, 50%)",
                intensity: 1,
                _position: { x: -6, y: 10, z: -24 },
        
            },
            "p2": {
                _type: "light",
                _light: "directional",
                color: "hsl(300, 100%, 50%)",
                intensity: 1,
                _position: { x: -9.05, y: 10, z: -23.21 },
        
            },
            "p3": {
                _type: "light",
                _light: "directional",
                color: "hsl(100, 100%, 50%)",
                _helper:true,
                intensity: 1,
                _position: { x: 21, y: 10, z: 16 }
        
            },
            // "p4": {
            //     _type: "light",
            //     _light: "directional",
            //     color: "hsl(180, 0%, 60%)",
            //     intensity: 1,
            //     _position: { x: 20, y: 5, z: 0 }
            // },
            // "top-light": {
            //     _type: "light",
            //     _light: "directional",
            //     color: "hsl(180, 0%, 80%)",
            //     intensity: 1,
            //     _position: { x: 0, y: 16, z: -40 }
            // }
        },
        cameras: {
            "main-cam": {
                _id:"main-cam",
                _type: "perspective-camera",
                fov: 40,
                ratio: window.innerWidth / window.innerHeight,
                _clipping: {
                    far: 5000,
                    close: 0.01
                },
                _position: { x: 0, y: 30, z: -40 },
                _rotation: { x: 0, y: 0, z: 0 },
                _disable_frame_3d_state: true,
                _3d_set_once:true,
                _add_audio_listener:true
            }
        },
        controls: {
            "cam-control": {
                _type: "orbit",
                _active: true,
                _params: {
                    enableDamping: true,
                    minPolarAngle: Math.PI / 3.5,
                    maxPolarAngle: Math.PI / 1.5,
                    minDistance: 2,
                    maxDistance: 10,
                    rotateSpeed: 0.3,
                }
            }
        }

    },
    "x3d-objects": {
        "pointer": {
            _type: "sphere",
            _id: "pointer",
            _geometry: {
                _type: "sphere-geometry",
                widthSegments: 8,
                heightSegments: 8,
                radius: 0.1
            },
            _material: {
                _type: "basic-material",
                color: 0xff99ff,
                side: 2,
                // roughness: 0.5,
            },
            _position: { x: 5, y: 10, z: -30 },
            _rotation: { x: 0, y: 0, z: 0 },
            castShadow: true,
            _on_frame: `follow-joystick`
        },
        "sound-2": {
            _type: "sphere",
            _id: "sound-2",
            _geometry: {
                _type: "sphere-geometry",
                widthSegments: 8,
                heightSegments: 8,
                radius: 0.1
            },
            _material: {
                _type: "standard-material",
                color: 0x009900,
                side: 2,
                // roughness: 0.5,
            },
            _position: { x: -2, y: 1, z: 0 },
            _rotation: { x: 0, y: 0, z: 0 },
            castShadow: true,
            //_on_frame: `rotation y:++0.01 `,
           // _positional_audio_source:"bass-drum-roll-2.mp3"
        }
    }
}


X3D.loadWorld(world)

const stage = {
    x:0,
    y:1.5,
    z:0,
}

_gltf.load("/Drummer.glb",{_id:"drummer",name:"drummer",_position:{x:0,y:stage.y,z:-0.2},_on_frame: ``},()=>{
    const drummer:X3DObject = X3D.om.getObject("drummer")
    drummer.playAnimation("Clapping")
})

_gltf.load("/DrumsChair.glb",{_id:"chair",_position:{x:0,y:stage.y,z:-0.2}})
_gltf.load("/Drums.glb",{_id:"drums",name:"drums",_position:{x:0,y:stage.y+0.1,z:0.8}})
// _gltf.load("/HalilitAMP.glb",{_id:"speaker2",name:"speaker2",_position:{x: -3, y: 0, z: -2},_rotation:{x:1.5,y:0,z:3.2}})
// _gltf.load("/HalilitAMP.glb",{_id:"speaker1",name:"speaker1",_position:{x: 3, y: 0, z: -2},_rotation:{x:1.5,y:0,z:3.2}})

_gltf.load("/arena.glb",{_id:"arena",name:"arena",_position:{x: 0, y: 0, z: 0},_rotation:{x:0,y:0,z:0}},() => {console.log(X3D.world)})


XUI.loadControl({
    _id: "joystick-1",
    _type: "joystick",
    _parent_element: "xcontrols",
    _joy_options: {
        size: 120,
        multitouch: true,
        maxNumberOfNipples: 1,
        mode: 'static',
        restJoystick: true,
        shape: 'circle',
        position: { bottom: '90px', left: '90px' },
        dynamicPage: true,
        color: "grey"
    }
})



XUI.importObject("top-bar",TopBar)

const topBar = XUI.create({
    _type:"top-bar",
    _id:"top-bar"
})


topBar.attach("player")





// const  adminNav = (e) => {
//     console.log(e)
//     if(e.key == " ") {
//         const pointer = X3D.om.getObject("pointer")
//         console.log(pointer._position);
//         pointer._position.y -= 0.01
        
//     }
// }

// document.addEventListener('keypress',adminNav)
