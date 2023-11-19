import { shaderMaterial } from "@react-three/drei";
import { extend, ShaderMaterialProps } from "@react-three/fiber";
import { useMemo } from "react";
import * as THREE from "three";
type uniformTypes = {
  uColor?: THREE.Color;
  uTime?: number;
  uMouse?: [number, number];
  uRF?: THREE.Vector2;
  uLF?: THREE.Vector2;
};
export type circleShaderType = ShaderMaterialProps & uniformTypes;
declare global {
  namespace JSX {
    interface IntrinsicElements {
      circleShader: circleShaderType;
    }
  }
}

const uniforms = {
  uColor: new THREE.Color(0.0, 0.0, 0.0),
  uTime: 0.0,
  uMouse: [0, 1],
  uRF: new THREE.Vector2(0.0, 0.0),
  uLF: new THREE.Vector2(0.0, 0.0),
};

const CircleShader = shaderMaterial(
  //uniform
  uniforms,
  //vertex
  /*glsl*/ `
  
    precision mediump float;
    uniform float uTime;
    uniform vec2 uRF;
    uniform vec2 uLF;
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
    uniform vec2 uRF;
    uniform vec2 uLF;
  
    varying vec2 vUv;
    varying vec3 v_pos;
    
    
#define SMOOTH(r,R) (1.0-smoothstep(R-1.0,R+1.0, r))
#define RANGE(a,b,x) ( step(a,x)*(1.0-step(b,x)) )
#define RS(a,b,x) ( smoothstep(a-1.0,a+1.0,x)*(1.0-smoothstep(b-1.0,b+1.0,x)) )
#define M_PI 3.1415926535897932384626433832795
  
    mat2 rotate(float a){
      float s = sin(a);
      float c = cos(a);
      return mat2(c,-s,s,c);
    }
  
    float box(in vec2 _st, in vec2 _size){
  
      _size = vec2(0.5) - _size*0.5;
      vec2 uv = smoothstep(_size,
                          _size+vec2(0.001),
                          _st);
      uv *= smoothstep(_size,
                      _size+vec2(0.001),
                      vec2(1.0)-_st);
  
                      return uv.x*uv.y;
  }
  
  float crosss(in vec2 _st, float _size){
      return  box(_st, vec2(_size,_size/4.)) +
              box(_st, vec2(_size/4.,_size));
      }

      float movingLine(vec2 uv, vec2 center, float radius)
      {
          //angle of the line
          float theta0 = 90.0 * uTime;
          vec2 d = uv - center;
          float r = sqrt( dot( d, d ) );
          if(r<radius)
          {
              //compute the distance to the line theta=theta0
              vec2 p = radius*vec2(cos(theta0*M_PI/180.0),
                                  -sin(theta0*M_PI/180.0));
              float l = length( d - p*clamp( dot(d,p)/dot(p,p), 0.0, 1.0) );
            d = normalize(d);
              //compute gradient based on angle difference to theta0
              float theta = mod(180.0*atan(d.y,d.x)/M_PI+theta0,360.0);
              float gradient = clamp(1.0-theta/90.0,0.0,1.0);
              return SMOOTH(l,1.0)+0.5*gradient;
          }
          else return 0.0;
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
      uv0 -=.5;
      vec2 rF = uRF;
      vec2 lF = uLF;
      rF -=.5;
      lF -=.5;
      float radius = 0.3*.45;
      float dtmr = length(rF-uv0);
      float dtml = length(lF-uv0);
      // radius = sin(.4);
      float cir4 = smoothstep(radius - 0.1, radius + 0.1, dtmr);
      float cir5 = smoothstep(radius - 0.1, radius + 0.1, dtml);
      cir4=step(cir4,0.002);
      cir5 = step(cir5,0.002);
      finalCol += vec3(0.3)*cir4;
      finalCol += vec3(0.3)*cir5;
      
      
      
      float line = movingLine(uv0,vec2(0.),.3);
      uv0 +=.5;
      float cir = smoothstep(length(vUv-.5),0.3,0.05);
      float cir2 = step(length(vUv-.5),0.3);
      float cros = 1.-crosss(vUv-vec2(.25),.3);
      float cros2 = 1.-crosss(vUv+vec2(.25),.3);
      float cros3 = 1.-crosss(vUv+vec2(.25,-.25),0.1);
      float cros4 = 1.-crosss(vUv+vec2(-.25,.25),.1);
      vec3 col = vec3(0.9,uv0);
      finalCol += blu*cir;
      finalCol += col*cir2;
      finalCol += finalCol-line;
      cros = step(cros,0.);
      cros4 = step(cros4,0.);
      finalCol = mix(finalCol,vec3(1.,.550,.1),cros);
      finalCol = mix(finalCol,vec3(1.,.950,.1),cros4);
      // finalCol += mix(finalCol,red,line);
      finalCol*=vec3(cros2)*vec3(cros3);
      finalCol = mix(finalCol,blu,cir4)*mix(finalCol,red,cir5);
      gl_FragColor = vec4(finalCol,1.0);
  
      }`
);
extend({ CircleShader });

export default CircleShader;
