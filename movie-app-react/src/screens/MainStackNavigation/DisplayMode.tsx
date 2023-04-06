import { Box, HStack, Pressable, Text } from 'native-base'
import Main from '../../components/generic/Main'
import NavHeader from '../../components/header/NavHeader'
import { Radio } from 'native-base'
import useColorMode from '../../hooks/useColorMode'
import { useEffect, useState } from 'react'

export default () => {
  const { getMode, setMode, getSystemModeAsync } = useColorMode()

  const [currentDisplayMode, setCurrentDisplayMode] = useState<any>(null)

  const radioColorStyle = {
    _dark: {
      bg: 'brand.900',
      _checked: {
        borderColor: 'blue.500',
        _icon: {
          color: 'blue.500',
        },
      },
    },
    _light: {
      bg: 'coolGray.100',
      _checked: {
        borderColor: 'blue.500',
        _icon: {
          color: 'blue.500',
        },
      },
    },
  }

  useEffect(() => {
    getSystemModeAsync().then(value => {
      if (value) {
        setCurrentDisplayMode('system')
      } else {
        setCurrentDisplayMode(getMode())
      }
    })
  }, [])

  const handleDisplayModeChange = (mode: any) => {
    // console.log('displayMode', mode)
    setMode(mode)
    setCurrentDisplayMode(mode)
  }

  return (
    <>
      <Main scroll={false}>
        <Box mt={12} mx={8}>
          <HStack mt={2}>
            <Radio.Group
              space={3}
              flex={1}
              name="displayMode"
              accessibilityLabel="Display Mode"
              value={currentDisplayMode}
              onChange={handleDisplayModeChange}
            >
              <Box
                w="full"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Pressable onPress={() => handleDisplayModeChange('system')}>
                  <Text fontSize={18} fontWeight="medium">
                    System
                  </Text>
                </Pressable>
                <Radio
                  {...radioColorStyle}
                  value="system"
                  _stack={{
                    direction: 'row-reverse',
                  }}
                  aria-label="System"
                  accessibilityLabel="System"
                />
              </Box>

              <Box
                w="full"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Pressable onPress={() => handleDisplayModeChange('light')}>
                  <Text fontSize={18} fontWeight="medium">
                    Light
                  </Text>
                </Pressable>
                <Radio
                  {...radioColorStyle}
                  value="light"
                  _stack={{
                    direction: 'row-reverse',
                  }}
                  aria-label="Light"
                  accessibilityLabel="Light"
                />
              </Box>

              <Box
                w="full"
                alignItems="center"
                justifyContent="space-between"
                flexDirection="row"
              >
                <Pressable onPress={() => handleDisplayModeChange('dark')}>
                  <Text fontSize={18} fontWeight="medium">
                    Dark
                  </Text>
                </Pressable>
                <Radio
                  {...radioColorStyle}
                  value="dark"
                  _stack={{
                    direction: 'row-reverse',
                  }}
                  aria-label="Dark"
                  accessibilityLabel="Dark"
                />
              </Box>
            </Radio.Group>
          </HStack>
        </Box>
      </Main>

      {/* NavHeader have to be the last component, because else the BlurView don't work */}
      <NavHeader
        navBarOptions={{
          left: 'Back&Title',
          leftTitle: 'Display Mode',
        }}
      />
    </>
  )
}
