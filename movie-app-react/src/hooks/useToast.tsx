import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  useToast,
  VStack,
  Text,
} from 'native-base'

export default () => {
  const toast = useToast()

  const showToast = (toastDetails: any) => {
    toast.show({
      render: () => {
        return (
          <Alert
            maxWidth="100%"
            alignSelf="center"
            flexDirection="row"
            status="error"
            variant="subtle"
          >
            <VStack space={1} flexShrink={1} mx="4">
              <HStack
                flexShrink={1}
                alignItems="center"
                justifyContent="space-between"
              >
                <HStack flexShrink={1} alignItems="center">
                  <Text
                    fontSize="md"
                    fontWeight="medium"
                    flexShrink={1}
                    color="coolGray.800"
                  >
                    {toastDetails.title}
                  </Text>
                </HStack>
                <IconButton
                  variant="unstyled"
                  icon={<CloseIcon size="3" />}
                  _icon={{
                    color: 'coolGray.400',
                  }}
                  onPress={() => {
                    toast.closeAll()
                  }}
                />
              </HStack>
            </VStack>
          </Alert>
        )
      },
    })
  }

  return {
    showToast,
  }
}
