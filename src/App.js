import {useState, useSyncExternalStore} from "react";
import { IconBasket } from '@tabler/icons-react';
import { Container,SimpleGrid,List, ThemeIcon, Input, Button,Group,Drawer,Indicator,Badge } from '@mantine/core';
import { IconCircleCheck, IconCircleDashed } from '@tabler/icons-react';
import './App.css';
import Card from "./components/Card";

const storeItems= [{
  id: 100,
  name: "Sandalye",
  src: "chair",
  price:250
},
{
  id: 101,
  name: "Askı",
  src: "hanger",
  price:20
},
{
  id: 102,
  name: "Masa Lambası",
  src: "lamp",
  price:125
},
{
  id: 103,
  name: "Dekoratif Tabak",
  src: "plate",
  price:180
},
{
  id: 104,
  name: "Dekoratif Heykel",
  src: "statue",
  price:65
},
{
  id: 105,
  name: "Şarap Bardağı",
  src: "wineglass",
  price:40
}];


let totalBasketItems = 0;




function App() {

  let [opened, setOpened] = useState(false);   
  let [basketItems,setBasketItems] = useState([]);  
  let [searchValue, setSearchValue] = useState(""); 
  let filteredItems = storeItems.filter((item) => item.name.toLowerCase().indexOf(searchValue.toLowerCase()) >= 0);  
  let addToBasket = ({id, name}) => {
    let basketIndex = basketItems.findIndex(item => item.id === id);
    if(basketIndex >= 0){
      let _basketItems = [...basketItems];
      _basketItems[basketIndex].count+=1;
      totalBasketItems+=1;
      setBasketItems(_basketItems);
    }
    else{
      totalBasketItems+=1;
      setBasketItems([...basketItems, {id, name, count: 1}])
    }
    
  }



return (
<Container className="App">
  <Group align="end">
    <Input.Wrapper label="Arama">
      <Input value={searchValue} onChange = {(e) => setSearchValue(e.target.value)}/>
    </Input.Wrapper>
    <Button onClick={() => setSearchValue("")}>Temizle</Button>
    <Indicator color="red" label={totalBasketItems !== 0 ? totalBasketItems : null} size={20}>
      <Button onClick={() => setOpened(true)}>
      <IconBasket size={20}/>
      </Button>
    </Indicator>
    </Group>
    <SimpleGrid cols={3} className= "Store">
      {filteredItems.map(({id, name, src}) =>{
        return <Card key={name} name={name} src={src} 
        onAdd={() => addToBasket({id, name})}
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