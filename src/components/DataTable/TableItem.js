import { Checkbox } from "@chakra-ui/checkbox";
import { ListIcon, List, ListItem } from "@chakra-ui/layout";
import { Td, Tr } from "@chakra-ui/table";
import React, { useState } from "react";
import { CalendarIcon } from "@chakra-ui/icons";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedDefinitions, setSelectValue, unSelectValue } from "./DataTableSlice";

const TableItem = ({ item }) => {
  const [select, setSelect] = useState(false);
  const selectedValue = useSelector(selectSelectedDefinitions);
  const dispatch = useDispatch();
  const handelSelect = () => {
    if (!item.status.treated) {
      setSelect((prev) => !prev);
      if (!select) {
        if (!selectedValue.some((s) => s === item.id)) {
          dispatch(setSelectValue(item));
        }
      } else {
        if (selectedValue.some((s) => s === item.id)) {
          dispatch(unSelectValue(item));
        }
      }
    }
  };
  return (
    <Tr
      _hover={{
        bg: "blue.700",
        color: "white",
        cursor: "pointer",
      }}
      onClick={handelSelect}
    >
      <Td>{!item.status.treated && <Checkbox isChecked={select} />}</Td>
      <Td>
        <List spacing={3} textAlign="start" px={12}>
          {item.recurrence.days.map((day) => (
            <ListItem key={day}>
              <ListIcon as={CalendarIcon} color="yellow.500" />
              {day}
            </ListItem>
          ))}
        </List>
      </Td>
      <Td>{item.recurrence.granularity}</Td>
      <Td>{item.status.created}</Td>
      <Td maxW="400">
        <b>Email:{item.email.header} </b>
        <br />
        {item.email.title}
      </Td>
      <Td>{item.status.treated ? <CheckCircleIcon color="green.500" /> : <InfoOutlineIcon color="yellow.500" />}</Td>
    </Tr>
  );
};

export default TableItem;
