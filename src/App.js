import { Box } from "@chakra-ui/layout";
import React from "react";
import DataTable from "./components/DataTable/Table";
import Header from "./components/Header/Header";

function App() {
  return (
    <Box>
      <Header />
      <Box m="20px" bg="blue.900" borderRadius="10px" border="black 1px solid">
        <DataTable />
      </Box>
    </Box>
  );
}

export default App;
