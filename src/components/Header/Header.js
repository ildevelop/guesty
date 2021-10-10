import React from "react";
import { Flex, Text } from "@chakra-ui/layout";

const Header = () => {
  return (
    <Flex justifyContent="center" bg="cyan.700">
      <Text fontSize="50px" color="tomato">
        The Leading Property Management Platform
      </Text>
    </Flex>
  );
};

export default Header;
