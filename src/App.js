import {useState} from "react";
import { Container,SimpleGrid,List, ThemeIcon, Input  } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import './App.css';
import Card from "./components/Card";

const storeItems= [{
  name: "Sandalye",
  src: "chair",
  price:250
},
{
  name: "Askı",
  src: "hanger",
  price:20
},
{
  name: "Masa Lambası",
  src: "lamp",
  price:125
},
{
  name: "Dekoratif Tabak",
  src: "plate",
  price:180
},
{
  name: "Dekoratif Heykel",
  src: "statue",
  price:65
},
{
  name: "Şarap Bardağı",
  src: "wineglass",
  price:40
}];




function App() {
  let [basketItems,setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState(""); 
  let filteredItems = storeItems.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);

  return (
    <Container className="App">
      <Input.Wrapper label="Arama">
  <Input onChange = {(e) => setSearchValue(e.target.value)}/>
</Input.Wrapper>
      <SimpleGrid cols={3} className= "Store">
        {filteredItems.map(({name, src}) =>{
          return <Card key={name} name={name} src={src} onAdd={() =>setBasketItems([...basketItems, {name}])}/>;

        })}
      </SimpleGrid >
      <List
      className="List"
      spacing="xs"
      size="sm"
      center
      icon={
        <ThemeIcon color="teal" size={24} radius="xl">
          <IconCircleCheck size="1rem" />
        </ThemeIcon>
      }
    >
      {storeItems.map(({name},index) =><List.Item key={index}>{name}</List.Item>)}
      
    </List>
    </Container>
  );
}

export default App;
