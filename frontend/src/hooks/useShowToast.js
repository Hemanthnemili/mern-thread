import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

function useShowToast() {
  const toast = useToast();
  const showToast = useCallback(
    (title, description, status) => {
      toast({
        title,
        description,
        status,
        isClosable: true,
        duration: 3000,
      });
    },
    [toast]
  );
  return showToast;
}

export default useShowToast;
