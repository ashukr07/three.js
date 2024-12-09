
import { useRef, useState } from 'react'
import './App.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshWobbleMaterial, OrbitControls, useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'
import { useControls } from 'leva'

const Cube = ({position,size,color}) => {
  const ref = useRef()
  useFrame((state,delta) => {
    // delta is the time between current and last frames in seconds

    if(ref.current)
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta*4
    //isase jo cube hai z axis pe oscillate karega getElapsedTime ke hisaab se badh raha isliye use use kiya

    ref.current.position.z = Math.sin(state.clock.getElapsedTime())*2
    
  })
  return (<mesh ref={ref} position={position}>
        <boxGeometry args={size}/>
        <meshStandardMaterial color={color}/>
      </mesh>
  )}

const Sphere = ({position,size,color}) => {
  const ref = useRef()
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  useFrame((state,delta) => {
    // delta is the time between current and last frames in seconds
    const speed = isHovered ? 2 : 0.5
    if(ref.current)
    ref.current.rotation.y += delta*speed
    //isase jo cube hai z axis pe oscillate karega getElapsedTime ke hisaab se badh raha isliye use use kiya

    // ref.current.position.z = Math.sin(state.clock.getElapsedTime())*2
  
  })
  return (<mesh ref={ref} position={position} 
    onPointerEnter={(event) =>(event.stopPropagation(),setIsHovered(true))} 
    onPointerLeave={(event) =>(event.stopPropagation(),setIsHovered(false))} 
    onClick={()=>{setIsClicked(!isClicked)}}
    scale={isClicked ? 1.5 :1}

  >
        <sphereGeometry args={size} />
        <meshStandardMaterial color={isHovered ? "orange" : "lightblue"} wireframe/>
      </mesh>
  )}

const Torus = ({position,size,color}) => { 
  const ref = useRef()  
  useFrame((state,delta) => {
    // delta is the time between current and last frames in seconds

    if(ref.current)
    ref.current.rotation.x += delta
    ref.current.rotation.y += delta*4
    //isase jo cube hai z axis pe oscillate karega getElapsedTime ke hisaab se badh raha isliye use use kiya

    ref.current.position.z = Math.sin(state.clock.getElapsedTime())*2
    
  })
  return (<mesh ref={ref} position={position}>
        <torusGeometry args={size}/>
        <meshStandardMaterial color={color}/>
      </mesh>
  )}

const TorusKnot = ({position,size}) => { 
  const ref = useRef()  
  const {color, radius} = useControls({
    color: "white",
    radius: {
      value: 5,
      min: 0,
      max: 10, 
      step: 0.1
    },
  })
  // useFrame((state,delta) => {
  //   if(ref.current) {
  //     ref.current.rotation.x += delta
  //     ref.current.rotation.y += delta*4   
  //     ref.current.position.z = Math.sin(state.clock.getElapsedTime())*2    
  //   }
  // })
  return (<mesh ref={ref} position={position}>
        <torusKnotGeometry args={[radius, ...size]}/>
        {/* <meshStandardMaterial color={color}/> */}
        <MeshWobbleMaterial color={color} speed={5} factor={0.6}/>
      </mesh>
  )}

const Scene = () => {
  const directionalLightRef = useRef()

  const {lightColor, lightIntensity} = useControls({
    lightColor: "white",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5, 
      step: 0.1
    },
  })

  //this is a hook that will help us to see the direction of the light that from where it is coming
  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white")
  return (
    <>
        <directionalLight 
        ref={directionalLightRef} 
        position={[0, 0, 3]} 
        intensity={lightIntensity} 
        color={lightColor}/>
        <ambientLight intensity={1} />
    {/* we define the position in the mesh as it is the whole thing */}
    {/* <group position={[0,-1,0]}>
    <Cube position={[1,0,0]} color={"hotpink" } size={[1,1,1]}/>
    <Cube position={[-1,0,0]} color={"green" } size={[1,1,1]}/>
    <Cube position={[1,2,0]} color={"red" } size={[1,1,1]}/>
    <Cube position={[-1,2,0]} color={"yellow" } size={[1,1,1]}/>
    </group> */}
    {/* <Cube position={[0,0,0]} color={"hotpink" } size={[1,1,1]}/> */}

    {/* <Sphere position={[0,0,0]} color={"hotpink" } size={[1,30,30]}/> */}
    {/* <Torus position={[-5,0,0]} color={"orange" } size={[1,0.5,16,100]}/> */}
    <TorusKnot position={[0,0,0]}  size={[1,0.1,1000,50]}/>
    <OrbitControls />
    </>
  )
}

const App = () => {
  return (
    <Canvas>
    <Scene />
    </Canvas>
  )
}

export default App

