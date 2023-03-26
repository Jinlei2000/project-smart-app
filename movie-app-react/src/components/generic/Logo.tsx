import { useColorMode } from 'native-base'
import { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Svg, { Path } from 'react-native-svg'

export default () => {
  const { colorMode } = useColorMode()
  const colorFillSymbol = '#24a8df'
  const [colorFillText, setColorFillText] = useState('#e6e6e7')

  useEffect(() => {
    if (colorMode === 'dark') {
      setColorFillText('#e6e6e7')
    } else {
      setColorFillText('#374151')
    }
  }, [colorMode])

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 998.07 322.73" style={styles.logo}>
        <Path
          d="m362.3,0c3.64,0,6.6,4.47,6.6,9.98v302.77c0,5.51-2.96,9.98-6.6,9.98s-6.6-4.47-6.6-9.98V9.98c0-5.51,2.96-9.98,6.6-9.98h0Zm0,0"
          fill={colorFillText}
        />
        <Path
          d="m424.12,153.03c-8.11,0-12.16-2.1-12.16-6.31V17.76c0-2.2.99-3.84,2.97-4.92,1.94-1.08,5.01-1.62,9.19-1.62h10.63c6.44,0,10.63,1.84,12.58,5.52l33.88,60.19,1.72,2.92,1.67-3.53,34.11-59.59c2.04-3.68,6.28-5.52,12.72-5.52h10.53c8.07,0,12.11,2.18,12.11,6.54v128.96c0,4.21-4.04,6.31-12.11,6.31h-5.9c-8.1,0-12.16-2.1-12.16-6.31V63.19l-.79-.23-29.24,52.25c-1.73,2.57-4.41,3.85-8.03,3.85h-5.75c-1.89,0-3.48-.32-4.78-.98-1.27-.65-2.37-1.61-3.29-2.87l-29.33-52.25-.79.23v83.53c0,4.21-4,6.31-12.02,6.31h-5.75Zm217.27,1.39c-13.74,0-25.42-2.8-35.04-8.4-9.65-5.6-16.99-13.78-22-24.55-5.01-10.77-7.52-23.88-7.52-39.35s2.5-28.49,7.52-39.26c5.01-10.77,12.34-18.92,22-24.46,9.62-5.57,21.3-8.35,35.04-8.35s25.55,2.79,35.18,8.35c9.62,5.54,16.94,13.69,21.95,24.46,4.98,10.77,7.47,23.85,7.47,39.26s-2.49,28.59-7.47,39.35c-5.01,10.77-12.33,18.95-21.95,24.55-9.62,5.6-21.35,8.4-35.18,8.4h0Zm0-26.54c10.8,0,18.94-3.9,24.45-11.69,5.54-7.83,8.31-19.18,8.31-34.06s-2.77-26.17-8.31-33.88c-5.51-7.7-13.66-11.55-24.45-11.55s-18.88,3.86-24.41,11.6c-5.54,7.73-8.31,19.01-8.31,33.83s2.79,26.23,8.36,34.06c5.6,7.8,13.72,11.69,24.36,11.69h0Zm130.3,25.15c-3.25,0-5.81-.31-7.7-.93-1.89-.65-3.06-1.73-3.52-3.25l-43.48-129.52c-.62-1.8-.93-3-.93-3.62,0-3,4.12-4.5,12.34-4.5h6.59c6.71,0,10.67,2,11.88,5.98l27.19,87.15,2.27,7.01h.79l2.28-7.01,27.84-87.15c1.36-3.99,5.37-5.98,12.02-5.98h6.13c8.07,0,12.11,1.5,12.11,4.5,0,1.36-.22,2.57-.65,3.62l-43.53,129.52c-.46,1.52-1.66,2.6-3.58,3.25-1.92.62-4.47.93-7.66.93h-10.4Zm92.44.23c-4.08,0-7.13-.56-9.14-1.67-1.98-1.15-2.97-2.77-2.97-4.88V17.76c0-4.46,4.04-6.68,12.11-6.68h7.01c4.18,0,7.23.57,9.14,1.72,1.91,1.11,2.88,2.77,2.88,4.96v128.96c0,4.36-4,6.54-12.02,6.54h-7.01Zm54.02-.56c-2.79,0-4.81-.65-6.08-1.95-1.3-1.27-1.95-3.3-1.95-6.08V19.71c0-2.82.65-4.84,1.95-6.08,1.27-1.24,3.3-1.86,6.08-1.86h73.79c2.1,0,3.63.79,4.59,2.37.93,1.58,1.39,4.14,1.39,7.7v6.12c0,3.56-.46,6.13-1.39,7.7-.96,1.58-2.49,2.37-4.59,2.37h-50.77v29.24h45.34c2.1,0,3.63.79,4.59,2.37.93,1.61,1.39,4.18,1.39,7.7v6.26c0,3.53-.46,6.09-1.39,7.71-.96,1.57-2.49,2.36-4.59,2.36h-45.34v32.62h50.86c2.14,0,3.67.79,4.6,2.37.96,1.61,1.44,4.14,1.44,7.61v6.36c0,3.53-.48,6.09-1.44,7.7-.93,1.58-2.46,2.37-4.6,2.37h-73.88Zm0,0"
          fill={colorFillText}
        />
        <Path
          d="m411.41,310.95c-1.15,0-2.32-1.1-3.53-3.29s-2.24-4.75-3.11-7.66c-.87-2.91-1.3-5.26-1.3-7.05,0-.37.12-1.02.37-1.95l67.52-94.71h-55.97c-2.13,0-3.66-.79-4.59-2.37-.96-1.58-1.44-4.15-1.44-7.7v-6.12c0-3.56.48-6.12,1.44-7.7.93-1.58,2.46-2.37,4.59-2.37h92.07c.99,0,2.07,1.13,3.25,3.39,1.17,2.26,2.15,4.89,2.92,7.89.8,2.97,1.21,5.37,1.21,7.19,0,.84-.08,1.36-.23,1.58l-67.29,94.48h61.53c2.11,0,3.64.79,4.6,2.36.93,1.61,1.39,4.14,1.39,7.61v6.36c0,3.53-.47,6.09-1.39,7.7-.96,1.58-2.49,2.37-4.6,2.37h-97.45Zm184.32,1.72c-13.74,0-25.42-2.8-35.04-8.4-9.65-5.6-16.99-13.79-22-24.55-5.01-10.77-7.52-23.89-7.52-39.35s2.5-28.49,7.52-39.26c5.01-10.76,12.34-18.92,22-24.45,9.62-5.57,21.3-8.36,35.04-8.36s25.55,2.79,35.18,8.36c9.65,5.54,16.97,13.69,21.95,24.45,4.98,10.77,7.47,23.86,7.47,39.26s-2.49,28.59-7.47,39.35c-4.98,10.77-12.3,18.95-21.95,24.55-9.62,5.6-21.35,8.4-35.18,8.4h0Zm0-26.54c10.8,0,18.96-3.9,24.5-11.7,5.51-7.83,8.26-19.18,8.26-34.06s-2.75-26.17-8.26-33.88c-5.54-7.71-13.7-11.56-24.5-11.56s-18.84,3.87-24.41,11.6c-5.54,7.74-8.31,19.02-8.31,33.83s2.79,26.23,8.36,34.06c5.6,7.8,13.72,11.7,24.36,11.7h0Zm99.73,25.15c-8.11,0-12.16-2.1-12.16-6.31v-128.96c0-2.2.99-3.84,2.97-4.92,1.94-1.08,5.01-1.62,9.19-1.62h8.59c3.25,0,5.94.37,8.08,1.11,2.1.78,3.84,2.24,5.2,4.41l47.57,73.32,5.43,8.17v-80.47c0-2.2.99-3.84,2.97-4.92,1.95-1.08,5.01-1.62,9.19-1.62h5.75c4.15,0,7.19.54,9.14,1.62,1.92,1.08,2.88,2.72,2.88,4.92v128.96c0,4.21-4.01,6.31-12.02,6.31h-7.7c-3.31,0-5.99-.35-8.03-1.07-2.04-.71-3.74-2.12-5.1-4.22l-49.84-76.25-4.32-6.36v81.58c0,4.21-4,6.31-12.02,6.31h-5.75Zm140.7-.32c-2.79,0-4.83-.65-6.12-1.95-1.27-1.27-1.91-3.29-1.91-6.08v-124.97c0-2.82.64-4.84,1.91-6.08,1.3-1.24,3.34-1.85,6.12-1.85h73.74c2.13,0,3.66.79,4.59,2.37.96,1.58,1.44,4.14,1.44,7.7v6.12c0,3.56-.48,6.13-1.44,7.7-.93,1.58-2.46,2.37-4.59,2.37h-50.72v29.23h45.29c2.1,0,3.63.79,4.59,2.37.93,1.61,1.39,4.18,1.39,7.7v6.26c0,3.53-.46,6.09-1.39,7.7-.96,1.58-2.49,2.37-4.59,2.37h-45.29v32.62h50.86c2.1,0,3.63.79,4.59,2.36.93,1.61,1.39,4.14,1.39,7.61v6.36c0,3.53-.47,6.09-1.39,7.7-.96,1.58-2.49,2.37-4.59,2.37h-73.88Zm0,0"
          fill={colorFillText}
        />
        <Path
          d="m160.56,321.93C71.92,321.93,0,250,0,161.36S71.92.8,160.56.8s160.56,71.92,160.56,160.56c0,37.33-12.83,73.48-36.54,102.25-7,8.16-19.05,9.33-27.21,2.72-8.16-7-9.33-19.05-2.72-27.21,17.88-21.77,27.6-48.98,27.6-77.36,0-66.87-54.43-121.68-121.68-121.68s-121.69,54.43-121.69,121.68,54.43,121.68,121.69,121.68c10.88,0,19.44,8.55,19.44,19.44s-8.55,19.05-19.44,19.05h0Zm0,0"
          fill={colorFillSymbol}
        />
        <Path
          d="m211.1,77.39c-8.55,0-17.11,3.11-23.33,9.72-12.83,12.83-12.83,33.82,0,47.04,6.61,6.61,14.77,9.72,23.33,9.72s17.11-3.11,23.32-9.72c12.83-12.83,12.83-33.82,0-47.04-6.22-6.22-14.77-9.72-23.32-9.72h0Zm0,0"
          fill={colorFillSymbol}
        />
        <Path
          d="m110.02,178.86c-8.55,0-17.11,3.11-23.32,9.72-12.83,12.83-12.83,33.82,0,47.04,6.61,6.61,14.77,9.72,23.32,9.72s17.11-3.11,23.33-9.72c12.83-12.83,12.83-33.82,0-47.04-6.61-6.61-14.77-9.72-23.33-9.72h0Zm0,0"
          fill={colorFillSymbol}
        />
        <Path
          d="m211.1,178.86c-8.55,0-17.11,3.11-23.33,9.72-12.83,12.83-12.83,33.82,0,47.04,6.61,6.61,14.77,9.72,23.33,9.72s17.11-3.11,23.32-9.72c12.83-12.83,12.83-33.82,0-47.04-6.22-6.61-14.77-9.72-23.32-9.72h0Zm0,0"
          fill={colorFillSymbol}
        />
        <Path
          d="m110.02,77.39c-8.55,0-17.11,3.11-23.32,9.72-12.83,12.83-12.83,33.82,0,47.04,6.61,6.61,15.16,9.72,23.32,9.72s17.11-3.11,23.33-9.72c12.83-12.83,12.83-33.82,0-47.04-6.61-6.22-14.77-9.72-23.33-9.72h0Zm0,0"
          fill={colorFillSymbol}
        />
        <Path
          d="m160.56,146.59c-3.89,0-7.39,1.56-10.5,4.28-5.83,5.83-5.83,15.16,0,20.99,2.72,2.72,6.61,4.28,10.5,4.28s7.39-1.55,10.5-4.28c5.83-5.83,5.83-15.16,0-20.99-3.11-2.72-6.61-4.28-10.5-4.28h0Zm0,0"
          fill={colorFillSymbol}
        />
        <Path
          d="m301.68,321.93h-142.68c-10.89,0-19.44-8.55-19.44-19.44s8.55-19.44,19.44-19.44h142.68c10.89,0,19.44,8.55,19.44,19.44s-8.94,19.44-19.44,19.44h0Zm0,0"
          fill={colorFillSymbol}
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 100,
    aspectRatio: 1 * 1.4,
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})