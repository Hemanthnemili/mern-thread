import { useToast } from "@chakra-ui/react";

function useShowToast() {
  const toast = useToast();
  const showToast = (title, description, status) => {
    toast({
      title,
      description,
      status,
      isClosable: true,
      duration: 3000,
    });
  };
  return showToast;
}

export default useShowToast;
