/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

enum CustomTab {
  All,
  Enabled,
  Disabled,
}

type CustomTabBarType = {
  title: string;
};

const buttons: CustomTabBarType[] = [
  {title: 'All'},
  {title: 'Enabled'},
  {title: 'Disabled'},
];

type Data = {
  id: String;
  title: string;
  price: string;
  image: string;
};

const dummyData = [
  {
    id: '1',
    title: 'Item 1',
    price: '$10',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Item 2',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '5',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '7',
    title: 'Item 1',
    price: '$10',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '8',
    title: 'Item 2',
    price: '$20',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '9',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '10',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '2',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '6',
    title: 'Item 3',
    price: '$30',
    image: 'https://via.placeholder.com/150',
  },
];

const Item = ({title, price, image}: Data) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  return (
    <View style={styles.itemContainer}>
      <CheckBox
        disabled={false}
        value={toggleCheckBox}
        onValueChange={newValue => setToggleCheckBox(newValue)}
      />
      <Image source={{uri: image}} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
  );
};

const All = () => (
  <FlatList
    data={dummyData}
    renderItem={({item}) => (
      <View>
        <Image source={{uri: item.image}} />
        <Text>{item.title}</Text>
        <Text>{item.price}</Text>
      </View>
    )}
    keyExtractor={item => item.id}
  />
);

const Enabled = () => (
  <FlatList
    data={dummyData}
    renderItem={({item}) => (
      <Item title={item.title} price={item.price} image={item.image} />
    )}
    keyExtractor={item => item.id}
  />
);

const Disabled = () => (
  <FlatList
    data={dummyData}
    renderItem={({item}) => (
      <Item title={item.title} price={item.price} image={item.image} />
    )}
    keyExtractor={item => item.id}
  />
);

const App = () => {
  const [selectedTab, setSelectedTab] = useState<CustomTab>(CustomTab.All);

  const renderContent = () => {
    switch (selectedTab) {
      case CustomTab.All:
        return <All />;
      case CustomTab.Enabled:
        return <Enabled />;
      case CustomTab.Disabled:
        return <Disabled />;
      default:
        return null;
    }
  };

  const bgColor = selectedTab === CustomTab.Enabled ? 'red' : 'green';

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flexDirection: 'row',
          padding: 20,
          margin: 20,
          backgroundColor: 'lightgrey',
        }}>
        {buttons.map((btn, index) => {
          const color = selectedTab === index ? 'pink' : '#ffffff';
          return (
            <View
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                backgroundColor: color,
                margin: 5,
                borderRadius: 50,
              }}>
              <TouchableOpacity onPress={() => setSelectedTab(index)}>
                <Text style={{padding: 10, color: 'black'}}>{btn.title}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
      <View style={{flex: 1}}>{renderContent()}</View>
      {selectedTab === CustomTab.All ? (
        <></>
      ) : (
        <View
          style={{
            height: 80,
            backgroundColor: bgColor,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', marginLeft: 20}}>
            42 Items Selected
          </Text>
          <Text style={{color: 'white', marginRight: 20}}>Enable Products</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
