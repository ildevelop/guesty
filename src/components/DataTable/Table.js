import React, { useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, TableCaption, Button } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import TableItem from "./TableItem";
import { useDispatch, useSelector } from "react-redux";
import { definitionList, treat, reset, selectDefinitions, selectSelectedDefinitions } from "./DataTableSlice";

const DataTable = () => {
  const list = useSelector(selectDefinitions);
  const selectedValue = useSelector(selectSelectedDefinitions);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!list.length) {
      dispatch(definitionList());
    }
  }, [list, dispatch]);

  return (
    <>
      <Table variant="simple" bg="facebook.900">
        <TableCaption>
          <Button leftIcon={<ArrowBackIcon />} onClick={() => dispatch(reset())} colorScheme="teal" variant="outline">
            Reset
          </Button>
          <Button
            rightIcon={<ArrowForwardIcon />}
            onClick={() => dispatch(treat(selectedValue))}
            colorScheme="teal"
            disabled={!selectedValue.length}
            variant="outline"
          >
            Treat Now {selectedValue.length ? selectedValue.length : ""}
          </Button>
        </TableCaption>
        <Thead>
          <Tr bg="blue.700">
            <Th color="white">Select</Th>
            <Th color="white">Recurrence</Th>
            <Th color="white">Granularity</Th>
            <Th color="white">Created</Th>
            <Th color="white">Message</Th>
            <Th color="white">Treated</Th>
          </Tr>
        </Thead>
        <Tbody>
          {list.map((item) => (
            <TableItem item={item} key={item.id} />
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default DataTable;
