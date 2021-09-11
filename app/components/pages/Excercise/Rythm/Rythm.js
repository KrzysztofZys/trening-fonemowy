import { useState, useEffect, useRef } from 'react';
import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import stylesPage from './Rythm.style';
import rythmImages from '../../../importedImages/rythmImages';
import rythmSounds from '../../../importedSounds/rythmSounds';

function getRandomElements(elements, level, isRepeatedAllowed) {
  let excersises = [];

  for (let i = 0; i < (level + 2); i++) {
    let newElement = elements[Math.floor(Math.random() * elements.length)];

    if (!isRepeatedAllowed) {
      if (excersises.includes(newElement)) i--;
      else excersises = [...excersises, newElement];
    } else excersises = [...excersises, newElement];
  }

  return excersises;
}

export default function Rythm({ route, navigation }) {
  const { excersise, index } = route.params;
  const [couter, setCounter] = useState(0);

  const [isExcersiseDone, setisExcersiseDone] = useState(false);

  const [userCombination, setUserCombination] = useState([]);
  const [excersiseElements, setExcersiseElements] = useState([]);
  const [gameElements, setGameElements] = useState([]);

  const [listenSoundNum, setListenSoundNum] = useState(0);
  const [wasPlayed, setWasPlayed] = useState(false);
  const [isFirstIterationEnded, setIsFirstIterationEnded] = useState(false);

  const addToUserCombination = (element) => {
    setUserCombination([...userCombination, element]);
  }

  const [Loaded, SetLoaded] = React.useState(false);
  const [Loading, SetLoading] = React.useState(false);
  const [Playing, SetPlaying] = React.useState(false);
  const [Duration, SetDuration] = React.useState(0);
  const [Value, SetValue] = React.useState(0);
  const sound = React.useRef(new Audio.Sound());

  const UpdateStatus = async (data) => {
    try {
      if (data.didJustFinish) {
        ResetPlayer();

      } else if (data.positionMillis) {
        if (data.durationMillis) {
          SetValue((data.positionMillis / data.durationMillis) * 100);
        }
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        SetValue(0);
        SetPlaying(false);
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
        UnloadAudio();
      }
    } catch (error) {
      console.log('Error');
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
          SetPlaying(true);
        }
      }
    } catch (error) {
      SetPlaying(false);
    }
  };

  const LoadAudio = async (data) => {
    SetLoading(true);
    const checkLoading = await sound.current.getStatusAsync();
    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync(
          data,
          {},
          true
        );
        if (result.isLoaded === false) {
          SetLoading(false);
          SetLoaded(false);
          console.log('Error in Loading Audio');
        } else {
          sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
          SetLoading(false);
          SetLoaded(true);
          SetDuration(result.durationMillis);
        }
      } catch (error) {
        SetLoading(false);
        SetLoaded(false);
      }
    } else {
      SetLoading(false);
      SetLoaded(true);
    }
  };

  const UnloadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();

    if (checkLoading.isLoaded)
      if (checkLoading.isPlaying === false) {
        try {
          const result = await sound.current.unloadAsync();
          if (result.isLoaded === false) {
            console.log('unloaded!!!')
            setWasPlayed(true);
            SetLoading(false);
            SetLoaded(false);
          }
        } catch (error) {
          console.log('error')
        }
      }

  }

  useEffect(() => {
    if (userCombination.length === (index + 2)) {
      setisExcersiseDone(true);
    }
  }, [userCombination])

  useEffect(() => {
    //Initial variables
    setExcersiseElements(getRandomElements(excersise.elements, index, false));
    setGameElements(getRandomElements(excersiseElements, index, true));
    setIsFirstIterationEnded(false);
    setListenSoundNum(0);
    console.log('init')
  }, [])

  useEffect(() => {
    //First iteration of listening the excersise
    if(gameElements[0] !== undefined) {
      if(!isFirstIterationEnded){
        LoadAudio(rythmSounds[parseInt(gameElements[listenSoundNum].id)])
        PlayAudio()
  
        if(wasPlayed) {
          setWasPlayed(false);
        } else {
          setListenSoundNum(listenSoundNum + 1)
          if (listenSoundNum > gameElements.length) {
            setListenSoundNum(0);
            setIsFirstIterationEnded(true);
          }
        }
      }
    } else SetLoaded(false)
    
  }, [Loaded])

  if (excersise === undefined) return <View style={stylesPage.container}><Text style={stylesPage.mainText}>No data</Text></View>

  return (
    <View style={stylesPage.container}>
      <ImageBackground source={require('../../../../assets/backgrounds/Example.png')} resizeMode="cover" style={stylesPage.backimage}>
        <View style={stylesPage.logoContainer}>
          <Image style={stylesPage.logo} source={require('../../../../assets/logo.png')}></Image>
        </View>
        {excersiseElements !== undefined &&
          <View style={stylesPage.excersiseContainer}>
            {
              excersiseElements.map((element, idx) =>
                <TouchableOpacity style={stylesPage.button} key={idx} onPress={() => addToUserCombination(element)}>
                  <Image style={stylesPage.imageButton} source={rythmImages[element.id]}></Image>
                </TouchableOpacity>
              )
            }
          </View>
        }
        <View style={stylesPage.bottomContainer}>
          <TouchableOpacity style={stylesPage.soundButton}>
            <Image style={stylesPage.soundIcon} source={require('../../../../assets/images/audio.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={stylesPage.forwardButton} disabled={!isExcersiseDone}>
            <Text style={[stylesPage.forwardButtonText, !isExcersiseDone && stylesPage.forwardButtonTextNo]}>dalej</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}