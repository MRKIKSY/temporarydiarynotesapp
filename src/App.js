import Header from './Header';
import AddItem from './Additem';
import SearchItem from './Searchitem';
import Content from './Content';
import Footer from './Footer';
import { useState,  } from 'react';
import { useEffect } from 'react';
import axios from 'axios'



function App() {
 
 

  // const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
 
 

  // useEffect(() => {
  //Fetch the list of items 
  //   const fetchItems = async () => {
  //     try {
  //       const response = await fetch(API_URL);
  //       if (!response.ok) throw Error('Did not receive expected data');
  //       const listItems = await response.json();
  //       setItems(listItems);
  //       setFetchError(null);
  //     } catch (err) {
  //       setFetchError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   setTimeout(() => fetchItems(), 2000);

  // }, [])
   //CREATE NEW ITEMS
  
    const [items, setItems] = useState([])
  
   
    useEffect(()=> {
      axios.get('http://localhost:3001/getnote')
      .then(res => {
        if(res.data.Status === "Success") {
          setNewItem(res.data.Result);
        } else {
          alert("Error")
        }
      })
      .catch(err => console.log(err));
    }, [])
   



  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    // const postOptions = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(myNewItem)
    // }
    
  }
  //TICK ITEMS 
  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    
  }
  //DELETE ITEMS
  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
   
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (

    //PROP DRILLING NEW ITEM FUNCTION, SETNEWITEM AND HANDLESUBMIT TO ADD ITEM PAGE
    //PROP DRILLING SEARCH AND SET SEARCH FUNCTION TO SEACH ITEM PAGE 
    <div className="App">
      <Header   title= " MR KIKSY TO DO LIST DIARY" /> 
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />

      
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
       <Content
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      </main>
      <Footer length={items.length} />
    </div>
  );
}

export default App;