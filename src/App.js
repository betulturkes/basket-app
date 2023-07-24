import {useState, useSyncExternalStore} from "react";
import { IconBasket } from '@tabler/icons-react';
import { Container,SimpleGrid,List, ThemeIcon, Input, Button,Group,Drawer,Indicator,Badge } from '@mantine/core';
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
  let [opened, setOpened] = useState(false);
  let [basketItems,setBasketItems] = useState([]);
  let [searchValue, setSearchValue] = useState(""); 
  let filteredItems = storeItems.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);
  let addToBasket = ({name}) => {
    setBasketItems([...basketItems, {name, count: 1}])
  }

  return (
<Container className="App">
  <Group align="end">
    <Input.Wrapper label="Arama">
      <Input value={searchValue} onChange = {(e) => setSearchValue(e.target.value)}/>
    </Input.Wrapper>
    <Button onClick={() => setSearchValue("")}>Temizle</Button>
    <Indicator color="red" label={basketItems.length} size={20}>
      <Button onClick={() => setOpened(true)}>
      <IconBasket size={20}/>
      </Button>
    </Indicator>
    </Group>
    <SimpleGrid cols={3} className= "Store">
      {filteredItems.map(({name, src}) =>{
        return <Card key={name} name={name} src={src} 
        onAdd={() => addToBasket({name})}
        />;
      })}
    </SimpleGrid >
    <Drawer
      opened={opened}
      onClose={()=> setOpened(false)}
      title="Sepetim"
      padding="md"
      size="xs">
      {<List
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
      {basketItems.map(({name, count},index) =>
      <List.Item key={index}>
        <Group><div>{name}</div> 
          <Badge>{count}</Badge>
        </Group>
      </List.Item>)}
      
      </List>}
    </Drawer>
  </Container>
  );
}

export default App;
