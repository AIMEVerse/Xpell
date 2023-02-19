import * as THREE from 'three'
import { XCamera, XGeometry, XLight, XMaterial, XMesh, XGroup } from './X3DCoreObjects'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import X3DObject from './X3DObject';
import X3D from "./X3D"
import {_xlog, _xem} from 'xpell-core';




class X3DLoader {
    static loading: boolean;


    static loadGLTF(fileName: string, data: any, onLoadCallBack?: Function) {

        const _onload = (gltf:any) => {

            let firstObj = null
            //to-do fix group loading position
            
            //gltf.scene.children.forEach(child => {
                const child = gltf.scene

                let xobject;
                child.animations = gltf.animations

                if (child.type == "Mesh") {
                    xobject = XMesh.getFromThreeObject(child, data)
                }
                else if (child.type == "Group") {
                    xobject = XGroup.getFromThreeObject(child, data)
                }
                else if (child.type == "Object3D") {
                    xobject = X3DObject.getFromThreeObject(child, data)
                }
                
                
                child.traverse((child2:THREE.Object3D) => {
                    child2.frustumCulled = false
                    /** add more */
                })
                
                xobject?.loadAnimations()

                

                if(xobject) X3D.add(xobject)
                // if(!firstObj) {
                //     firstObj=xobject
                //     data._id = XUtils.guid()
                // }

            //})

            if (data["_id"]) _xem.fire(data["_id"] + "-loaded", {})
            if (onLoadCallBack) onLoadCallBack(xobject)
        }

        const _onprogress = (data:any) => {
            // this.loading=false

        }

        const _onerror = (error:any) => {
            console.error(error);
            this.loading = false

        }

        const loader = new GLTFLoader()
        loader.load(fileName, _onload, _onprogress, _onerror);
    }


    static loadFBX(fileName: string, data: any, onLoadCallBack?: Function) {
        
        const _onload = (obj:THREE.Object3D) => {
            
            //to-do fix group loading position
            // obj.children.forEach(child => {
            let xobject;
            //child.animations = obj.animations


            if (obj.type == "Mesh") {
                xobject = XMesh.getFromThreeObject(<THREE.Mesh>obj, data)
            }
            else if (obj.type == "Group") {
                xobject = XGroup.getFromThreeObject(<THREE.Group>obj, data)
            }
            else if (obj.type == "Object3D") {
                xobject = X3DObject.getFromThreeObject(obj, data)
            }
            xobject?.loadAnimations()

            if(xobject) X3D.add(xobject)

            // })

            if (data["_id"]) _xem.fire(data["_id"] + "-loaded", {})
            if (onLoadCallBack) onLoadCallBack(xobject)

            



        }

        const _onprogress = (data:any) => {
            // this.loading=false

        }

        const _onerror = (error:any) => {
            _xlog.error(error);
            this.loading = false

        }

        const loader = new FBXLoader()
        loader.load(fileName, _onload, _onprogress, _onerror);
    }

    static loadFBXAnimation(fileName: string, x3dObject:X3DObject,onLoadCallBack?:Function) {

        const _onload = (obj:THREE.Object3D) => {
            
           x3dObject.importAnimations(obj)
           if(onLoadCallBack ) onLoadCallBack()


        }

        const _onprogress = (data:any) => {
            // this.loading=false

        }

        const _onerror = (error:any) => {
            _xlog.error(error);
            this.loading = false

        }

        const loader = new FBXLoader()
        loader.load(fileName, _onload, _onprogress, _onerror);
    }


    static async loadModelFromGLTF(modelUrl: string): Promise<THREE.Object3D> {
        return new Promise(function (resolve, reject) {
            const _onload = (gltf:any) => {

                const child = gltf.scene

                child.animations = gltf.animations

                // child.traverse((child2) => {
                //     child2.frustumCulled = false
                //     /** add more */
                // })

                resolve(child)
            }

            const _onprogress = (data:any) => {
                // this.loading=false

            }

            const _onerror = (error:any) => {
                _xlog.error(error);
                reject(error)
            }

            const loader = new GLTFLoader()
            loader.load(modelUrl, _onload, _onprogress, _onerror)
        })
    }

}

export default X3DLoader
export { X3DLoader }