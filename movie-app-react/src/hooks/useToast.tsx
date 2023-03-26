import {
  Alert,
  CloseIcon,
  HStack,
  IconButton,
  useToast,
  Text,
} from 'native-base'

export default () => {
  const toast = useToast()

  const showToast = (toastDetails: {
    title: string | undefined
    status: string
  }) => {
    toast.show({
      placement: 'bottom',
      render: () => {
        return (
          <Alert
            rounded="lg"
            status={toastDetails.status}
            variant="subtle"
            mx={6}
          >
            <HStack alignItems="center" justifyContent="space-between">
              <Text
                fontSize={14}
                fontWeight="500"
                color="coolGray.600"
                flexShrink={1}
              >
                {toastDetails.title}
              </Text>
              <IconButton
                p={0}
                pl={4}
                variant="unstyled"
                icon={<CloseIcon size="4" />}
                _icon={{
                  color: 'coolGray.400',
                }}
                onPress={() => {
                  toast.closeAll()
                }}
              />
            </HStack>
          </Alert>
        )
      },
    })
  }

  return {
    showToast,
  }
}
