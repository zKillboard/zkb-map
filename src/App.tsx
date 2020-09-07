import React, { useRef, useEffect } from 'react'
import { useKillmails } from './useKillmails'
import { useSolarSystems } from './useSolarSytems'
import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'
import { Canvas } from 'react-three-fiber'
import * as THREE from 'three'
import { CameraControls } from './CameraControls'
import { theme, ThemeContext } from './utils/theme'
import Stars from './Stars'
import Flares from './Flares'
import { Stats } from 'drei'
import KillmailTicker from './KillmailTicker'
import { useAppSelector } from './store'

const GlobalStyle = createGlobalStyle`
  ${reset}

  #root {
    height: 100vh;
    background: ${theme.background};
    overflow: hidden;
  }
`

const cameraConfig  = {
  position: new THREE.Vector3(0, 0, 1_000),
  near: 0.001,
  far: 10_000
}

const App: React.FC<{}> = () => {
  useSolarSystems()

  const sourceUrl = 'wss://zkillboard.com/websocket/'
  const killmails = useKillmails({ sourceUrl })

  const killmailsRef = useRef<typeof killmails>([])

  const solarSystems = useAppSelector(state => state.solarSystems)

  useEffect(() => {
    killmailsRef.current = killmails
  }, [killmails])

  return <ThemeContext.Provider value={theme}>
    <GlobalStyle />

    <Canvas camera={cameraConfig} onCreated={({ gl }) => gl.setClearColor(theme.background)}>
      {/* <Stats /> */}

      <ambientLight />

      <Stars solarSystems={solarSystems} />
      <Flares solarSystems={solarSystems} killmails={killmailsRef} />

      <CameraControls />
    </Canvas>

    <KillmailTicker killmails={killmails} solarSystems={solarSystems} />
  </ThemeContext.Provider>
}

export default App;
