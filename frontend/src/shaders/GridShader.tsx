import { shaderMaterial } from "@react-three/drei";
import { extend, ShaderMaterialProps } from "@react-three/fiber";
import * as THREE from "three";
export type gridShaderType = ShaderMaterialProps & {
  uColor?: THREE.Color;
  uTime?: number;
  uMouse?: [number, number];
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      gridShader: gridShaderType;
      /* Your props type here if any */
    }
  }
}

const GridShader = shaderMaterial(
  //uniform
  { uColor: new THREE.Color(0.0, 0.0, 0.0), uTime: 0.0, uMouse: [0, 1] },
  //vertex
  /*glsl*/ `
  
    precision mediump float;
    uniform float uTime;
    varying vec2 vUv;
    varying vec3 v_pos;
  
  
     
      void main(){
  
      vec3 pos = position;
      vUv = uv;
      v_pos=pos;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }`,
  //fragment
  /*glsl*/ `
    precision mediump float;
  
    uniform float uTime;
    uniform vec3 uColor;
  
    varying vec2 vUv;
    varying vec3 v_pos;
    
    
    float Hex(vec2 p){
        p =abs(p);
        float c=dot(p,normalize(vec2(1.,1.73)));
        c = max(c,p.x);
        return c;
    }
  
    vec4 HexCoords(vec2 uv0){
        vec2 r = vec2(1.,1.73);
      vec2 h = r*.5;
      vec2 a = mod(uv0,r)-h;
      vec2 b = mod(uv0-h,r)-h;

      vec2 gv;
      if(length(a)<length(b))
        gv=a;
    else
        gv=b;
    float x = atan(gv.x,gv.y);
    float y = .5-Hex(gv);
    vec2 id = uv0-gv;
    
    return vec4(x,y,id);
    }
    void main(){

      //position(x,y)->shape(float)->mask(float)->color(rgb)->mix(rgb)=finalCol(rgb)
      vec3 pos = v_pos;
      
      vec3 finalCol = vec3(0.);
      vec3 blu = vec3(0.4,0.9,0.9);
      vec3 red = vec3(0.9,0.2,0.2);
      vec3 whit = vec3(1.);
      vec2 uv0 = vUv;
      vec2 uv1 = vUv;
      uv1*=10.+uTime;
      uv1-=.5;
      uv0.x -=.5;
      uv0.y -=.5;
      uv0 *=12.;
    //   uv0 *= clamp(sin(uTime),0.5,1.)*25.;
    //   uv0=vec2(uv0.x+sin(uTime),uv0.y);
      vec4 hc = HexCoords(uv0);
      float c = smoothstep(.05,.1,hc.y*sin(hc.z*hc.z*hc.w+uTime));
      finalCol+=mix(vec3(0.),vec3(c*hc.w-hc.y,.8,c*uv1.y),c);
    if(hc.w > sin(1.-uTime*.4)*25.){
        c = smoothstep(0.03,.8,hc.y);
        finalCol+=mix(vec3(0.0),vec3(.8,.3*hc.z,.9),c);
    }
    finalCol+=mix(vec3(0.0),vec3(.8*hc.x+sin(hc.w)+fract(abs(hc.z+sin(uTime))),.3,.9),c);
    finalCol*=blu-red+vec3(.0,0.8*c,.3*c);
      gl_FragColor = vec4(finalCol,1.0);
  
      }`
);
extend({ GridShader });

export default GridShader;
