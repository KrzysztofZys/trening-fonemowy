import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from "@react-navigation/native";
import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, BackHandler, Alert } from 'react-native';
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

function checkEqualCombinations(comb1, comb2) {
  if(JSON.stringify(comb1) == JSON.stringify(comb2)) return true;
  return false;
}

export default function Rythm({ route, navigation }) {
  const { excersise, index } = route.params;
  const isFocused = useIsFocused();
  const [couter, setCounter] = useState(0);

  const [isExcersiseDone, setisExcersiseDone] = useState(false);
  const [isExcersiseFail, setIsExcersiseFail] = useState(false);

  const [userCombination, setUserCombination] = useState([]);
  const [excersiseElements, setExcersiseElements] = useState([]);
  const [gameElements, setGameElements] = useState([]);

  const [listenSoundNum, setListenSoundNum] = useState(0);
  const [isFirstIterationEnded, setIsFirstIterationEnded] = useState(false);
  const [shoudMusicStart, setShoudMusicStart] = useState();

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
    if (data !== undefined) {
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
            setListenSoundNum(listenSoundNum + 1)
            if (listenSoundNum >= gameElements.length-1) {
              setListenSoundNum(0);
              setIsFirstIterationEnded(true);
            }
            SetLoading(false);
            SetLoaded(false);
          }
        } catch (error) {
          console.log('error')
        }
      }

  }

  const RepeatSequence = () => {
    console.log('Repeat try')
    setShoudMusicStart(!shoudMusicStart)
    setIsFirstIterationEnded(false)
  }

  const addToUserCombination = (element) => {
    setUserCombination(() => [...userCombination, element]);
  }

  //Check if user comb in ok
  useEffect(() => {
    if (userCombination.length === (index + 2)) {
      if (checkEqualCombinations(userCombination, gameElements)) {
        setIsExcersiseFail(false);
        setisExcersiseDone(true);
      } else {
        setIsExcersiseFail(true);
      }

      setUserCombination([]);
    }
  }, [userCombination])

  //Initial ExcersiseElements
  useEffect(() => {
    if(isFocused) setExcersiseElements(getRandomElements(excersise.elements, index, false));
  }, [isFocused])

  useEffect(() => {
    setGameElements(getRandomElements(excersiseElements, index, true));
    setIsFirstIterationEnded(false);
    setListenSoundNum(0);
    setisExcersiseDone(false);
    setIsExcersiseFail(false);
    console.log('init');
    setShoudMusicStart(false);
  }, [JSON.stringify(excersiseElements)])

  useEffect(() => {
    if(gameElements[0]!==undefined) setShoudMusicStart(true)
  }, [JSON.stringify(gameElements)])

  useEffect(() => {
    //Sequence
    console.log('try to play sound in use eff')
      if (!isFirstIterationEnded) {
        console.log('first iteration not ended')
        if(gameElements[0]!==undefined) {
          LoadAudio(rythmSounds[parseInt(gameElements[listenSoundNum]?.id)])
          PlayAudio()
        }
        
      }

  }, [Loaded, shoudMusicStart])

  //Prevent from going back when music is on
  useEffect(() => {
    const backAction = () => {
      if (isFirstIterationEnded) {
        return false;
      }
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isFirstIterationEnded]);

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
                <TouchableOpacity style={stylesPage.button} key={idx} disabled={!isFirstIterationEnded} onPress={() => addToUserCombination(element)}>
                  <Image style={[stylesPage.imageButton, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={rythmImages[element.id]}></Image>
                </TouchableOpacity>
              )
            }
          </View>
        }
        {isExcersiseFail && <Text style={stylesPage.goodComment}>BAD BOY!!!!!</Text>}
        {isExcersiseDone && <Text style={stylesPage.goodComment}>BRAWISSIMO!!!!!</Text>}
        <View style={stylesPage.bottomContainer}>
          <TouchableOpacity style={stylesPage.soundButton} disabled={!isFirstIterationEnded} onPress={() => RepeatSequence()}>
            <Image style={[stylesPage.soundIcon, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={require('../../../../assets/images/audio.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={stylesPage.forwardButton} disabled={!isExcersiseDone}>
            <Text style={[stylesPage.forwardButtonText, !isExcersiseDone && stylesPage.buttonDisabled]}>dalej</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}