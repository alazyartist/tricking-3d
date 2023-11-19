import { shaderMaterial } from "@react-three/drei";
import { extend, ShaderMaterialProps } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
type uniformTypes = {
  uColor?: THREE.Color;
  uTime?: number;
  uMouse?: [number, number];
};
export type circleWipeShaderType = ShaderMaterialProps & uniformTypes;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      circleWipeShader: circleWipeShaderType;
    }
  }
}

const uniforms = {
  uColor: new THREE.Color(0.0, 0.0, 0.0),
  uTime: 0.0,
  uMouse: [0, 1],
  uTexture: new THREE.Texture(),
};

const CircleWipeShader = shaderMaterial(
  //uniform
  uniforms,
  //vertex
  /*glsl*/ `
  
    precision mediump float;
    uniform float uTime;
    uniform vec2 uMouse;
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
    uniform vec2 uMouse;
    uniform sampler2D uTexture;
  
    varying vec2 vUv;
    varying vec3 v_pos;
    

    mat2 rotate(float a){
      float s = sin(a);
      float c = cos(a);
      return mat2(c,-s,s,c);
    }
  
  
    void main(){

      //position(x,y)->shape(float)->mask(float)->color(rgb)->mix(rgb)=finalCol(rgb)
      vec3 pos = v_pos;
      vec3 am = vec3(0.5);
      vec3 finalCol = vec3(0.);
      vec3 blu = vec3(0.4,0.9,0.9);
      vec3 red = vec3(0.9,0.2,0.2);
      vec3 whit = vec3(1.);
      vec2 uv0 = vUv;
      vec2 uv1 = vUv;
     //center coordinates and scale up
      vec2 normCoord = (uv0 - vec2(0.5)) * 2.0;

      // Calculate polar coordinates
      float angle = atan(normCoord.y, normCoord.x);
      float radius = length(normCoord);
  
      // Convert angle to positive values
      angle = mod(angle, 6.283185);
  
      float sectorAngle = atan(uMouse.y - 0.5, uMouse.x - 0.5) ;
      sectorAngle = mod(sectorAngle, 6.283185);

      // Determine the sector (45-degree arcs)
      float sector = floor((angle) / 0.785398);
      float sector2 = floor((sectorAngle) / 0.785398);
  
      // Assign color based on the sector
      vec3 color; 
      vec3 hovColor;
      vec3 hovColor2;
      vec3 tex = texture2D(uTexture, vUv).rgb;
      if (sector2 == 0.0) {
          hovColor = vec3(0.42,0.81,0.91); // BacksideHyper
          hovColor2 = vec3(0.17,0.35,0.7); // FrontsideSemi
        } else if (sector2 == 1.0) {
          hovColor = vec3(0.3671875,0.84375,0.76953125) ; // InsideHyper
          hovColor2 = vec3(0.18,0.7,0.42); // OutsideSemi 
        } else if (sector2 == 2.0) {
          hovColor = vec3(0.25,0.73,0.65); // InsideMega
          hovColor2 = vec3(0.46,0.98,0.7); //OutsideComplete
        } else if (sector2 == 3.0) {
          hovColor = vec3(0.25,0.44,0.79); // FrontsideMega
          hovColor2 = vec3(0.49,0.88,0.98); // BacksideComplete
        } else if (sector2 == 4.0) {
          hovColor = vec3(0.17,0.35,0.7); // FrontsideSemi
          hovColor2 = vec3(0.42,0.81,0.91); // BacksideHyper
        } else if (sector2 == 5.0) {
          hovColor = vec3(0.18,0.7,0.42); // OutsideSemi 
          hovColor2 = vec3(0.3671875,0.84375,0.76953125) ; // InsideHyper
        } else if (sector2 == 6.0) {
          hovColor = vec3(0.46,0.98,0.7); //OutsideComplete
          hovColor2 = vec3(0.25,0.73,0.65); // InsideMega
        } else {
          hovColor = vec3(0.49,0.88,0.98); // BacksideComplete
          hovColor2 = vec3(0.25,0.44,0.79); // FrontsideMega
      }
      // if (sector == 0.0) {
      //     color = vec3(1.0, 0.0, 0.0); // Red
      // } else if (sector == 1.0) {
      //     color = vec3(1.0, 0.5, 0.0); // Orange
      // } else if (sector == 2.0) {
      //     color = vec3(1.0, 1.0, 0.0); // Yellow
      // } else if (sector == 3.0) {
      //     color = vec3(0.0, 1.0, 0.0); // Green
      // } else if (sector == 4.0) {
      //     color = vec3(0.0, 0.0, 1.0); // Blue
      // } else if (sector == 5.0) {
      //     color = vec3(0.5, 0.0, 1.0); // Purple
      // } else if (sector == 6.0) {
      //     color = vec3(1.0, 0.0, 1.0); // Magenta
      // } else {
      //     color = vec3(1.0, 1.0, 1.0); // White (fallback)
      // }
     color=tex;
      
      // Apply radius-based falloff for smooth transitions
      float cir = smoothstep(0.99, 1.0, radius);
      cir = step(cir,0.5);
      // cir = 1.0 - cir;
      color *= cir;
      
      finalCol = color;
      finalCol = mix(finalCol, hovColor, 1.-cir);
      //circle around mouse position
      float dist = distance(uMouse,uv0);
      float rad = 0.01;
      float circle = smoothstep(rad,rad+0.01,dist);

      
      float pi = 3.1415926535897932384626433832795;

      // finalCol *= circle;
      //mask2 is a circle mask from uv0 with whit on top and vec3(0.) on bottom
      
      uv0 = uv0-vec2(0.5);
      uv1 = rotate(sectorAngle+(pi)-(pi/4.0))*uv0+vec2(0.5);
      uv0 = rotate(sectorAngle+(pi/2.0))*uv0;
      uv0 = uv0+vec2(0.5);
      //mask is a v mask that points at mouse position
      float mask = abs(uv1.x> uv1.y ? uv1.x : uv1.y);
      
      float mask2 = mix(max(step(0.5,distance(uv0,vec2(0.5))),step(0.5,uv0.y<0.5?1.:0.)),cir,1.0-cir);
      float mask3 = mix(max(step(0.5,distance(uv0,vec2(0.5))),step(0.5,uv0.y<0.5?0.:1.)),cir,1.0-cir);
      
      
      vec2 dir = normalize(uv0-vec2(0.5));
      float angle2 = atan(dir.y,dir.x) + pi/2.0;
      float factor = max(1.5,abs(sin(uTime*.5))*8.0);
      float normAngle =pi/factor;
      uv1 = uv1+vec2(0.5);
      
      
      float mask4 = smoothstep(1.0,0.0,normAngle-abs(angle2));
      mask4 = step(mask4,0.5);
      // finalCol = vec3(.9);
      vec3 col2 = mask3 *red;      
      vec3 col3 = mask2 *hovColor;      
      // vec3 col4 = mask4 *hovColor;
      finalCol = mix(finalCol,hovColor,mask4);      
      // finalCol = max(finalCol,col3);      
      finalCol = mix(finalCol,hovColor2,mask3);      
      gl_FragColor = vec4(finalCol,1.0);
      }`
);
extend({ CircleWipeShader });

export default CircleWipeShader;
