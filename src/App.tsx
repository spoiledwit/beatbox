import { SafeAreaView, StatusBar, StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import { setupPlayer, addTrack } from '../musicPlayerServices'
import MusicPlayer from './screens/MusicPlayer'

export default function App() : JSX.Element {

  const [isPlayerReady, setIsPlayerReady] = useState(false)
  
  async function setup() {
      let isSetup = await setupPlayer();
      if (isSetup) 
      {
        await addTrack();
      }
      setIsPlayerReady(isSetup);
  }

  useEffect(() => {
    setup();
  }, [])
  
if (!isPlayerReady) {
  return (
    <SafeAreaView>
      <ActivityIndicator />
    </SafeAreaView>
  )
}

  return (
    <View style={styles.container}>
      <StatusBar 
      barStyle={'light-content'}
      />
      <MusicPlayer />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  }
})