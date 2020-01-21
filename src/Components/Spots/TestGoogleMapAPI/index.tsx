import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';
import getGoogleMapsApiKey from '../SpotMap/utils';

const GOOGLE_MAPS_API_KEY = getGoogleMapsApiKey();

const url = `https://maps.googleapis.com/maps/api/staticmap?center=41.3717989,2.1155701&zoom=5&scale=1&size=100x100&maptype=roadmap&format=png&key=${GOOGLE_MAPS_API_KEY}`;

const TestGoogleMapAPI = () => {
  const [msg, setMsg] = useState('no msg');

  const handlePress = async () => {
    try {
      const res = await axios.get(url);
      console.log('SUCCESS', res);
      setMsg(JSON.stringify(res));
    } catch (exc) {
      setMsg(JSON.stringify(exc));
    }
  };

  return (
    <View>
      <Text>{msg}</Text>
      <Button
        title="Press me"
        onPress={handlePress}
      />
    </View>
  );
};

export default TestGoogleMapAPI;
