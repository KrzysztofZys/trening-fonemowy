import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from "@react-navigation/native";
import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, BackHandler, Dimensions } from 'react-native';
import { Audio } from 'expo-av';
import ProgressBar from '../../../elements/ProgressBar/ProgressBar';
import LogoExcersise from '../../../elements/LogoExcersise/LogoExcersise';
import RepeatButton from '../../../elements/Buttons/RepeatButton';
import OkButton from '../../../elements/Buttons/OkButton';
import AudioButton from '../../../elements/Buttons/AudioButton';
import NextButton from '../../../elements/Buttons/NextButton';
import stylesPage from '../Excersise.style';
import rythmImages from '../../../importedImages/rythmImages';
import rythmSounds from '../../../importedSounds/rythmSounds';

function getRandomExcersiseElements(elements, level, isRepeatedAllowed) {
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
  if (JSON.stringify(comb1) == JSON.stringify(comb2)) return true;
  return false;
}

export default function Rythm({ route, navigation }) {
  const { excersise, index } = route.params;
  const isFocused = useIsFocused();
  const [counter, setCounter] = useState(0);

  const [isExcersiseDone, setisExcersiseDone] = useState(false);
  const [isExcersiseFail, setIsExcersiseFail] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [userCombination, setUserCombination] = useState([]);
  const [excersiseElements, setExcersiseElements] = useState([]);
  const [gameElements, setGameElements] = useState([]);

  const [listenSoundNum, setListenSoundNum] = useState(0);
  const [isFirstIterationEnded, setIsFirstIterationEnded] = useState(false);
  const [shoudMusicStart, setShoudMusicStart] = useState();

  const [Loaded, SetLoaded] = useState(false);
  const sound = useRef(new Audio.Sound());

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    if ((windowHeight / windowWidth) < 1.7) setIsSmall(true);
  })

  let backSource = require('../../../../assets/backgrounds/Example.png');
  if ((windowHeight / windowWidth) < 1.7) backSource = require('../../../../assets/backgrounds/ExampleB.png')

  const UpdateStatus = async (data) => {
    try {
      if (data.didJustFinish) ResetPlayer();
    } catch (error) {
      console.log(error);
    }
  };

  const ResetPlayer = async () => {
    try {
      const checkLoading = await sound.current.getStatusAsync();
      if (checkLoading.isLoaded === true) {
        await sound.current.setPositionAsync(0);
        await sound.current.stopAsync();
        UnloadAudio();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded && result.isPlaying === false) sound.current.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

  const LoadAudio = async (data) => {
    const checkLoading = await sound.current.getStatusAsync();
    if (data !== undefined) {
      if (checkLoading.isLoaded === false) {
        try {
          const result = await sound.current.loadAsync(data, {}, true);
          if (result.isLoaded === false) SetLoaded(false);
          else {
            sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
            SetLoaded(true);
          }
        } catch (error) {
          console.log(error);
          SetLoaded(false);
        }
      } else SetLoaded(true);
    }
  };

  const UnloadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();

    if (checkLoading.isLoaded)
      if (checkLoading.isPlaying === false) {
        try {
          const result = await sound.current.unloadAsync();
          if (result.isLoaded === false) {
            setListenSoundNum(listenSoundNum + 1)
            if (listenSoundNum >= gameElements.length - 1) {
              setListenSoundNum(0);
              setIsFirstIterationEnded(true);
            }
            SetLoaded(false);
          }
        } catch (error) {
          console.log(error)
        }
      }

  }

  const repeatSequence = () => {
    setShoudMusicStart(!shoudMusicStart)
    setIsFirstIterationEnded(false)
    setIsExcersiseFail(false)
  }

  const nextSequence = () => {
    if (isFinished) navigation.navigate('Trainings');
    else {
      setExcersiseElements(getRandomExcersiseElements(excersise.elements, index, false));
      setCounter(counter + 1)
      setisExcersiseDone(false);
    }
  }

  const addToUserCombination = (element) => {
    setUserCombination([...userCombination, element]);
  }

  useEffect(() => {
    if (counter === (excersise.repeat - 1)) setIsFinished(true)
  }, [counter])

  //Check if user comb in ok
  useEffect(() => {
    if (userCombination.length >= (index + 2)) {
      if (checkEqualCombinations(userCombination, gameElements)) {
        setIsExcersiseFail(false);
        setisExcersiseDone(true);
      } else {
        setIsExcersiseFail(true);
      }
      setUserCombination([]);
    }
  }, [JSON.stringify(userCombination)])

  //Initial ExcersiseElements
  useEffect(() => {
    if (isFocused) {
      setExcersiseElements(getRandomExcersiseElements(excersise.elements, index, false))
      setCounter(0)
      setIsFinished(false)
      setisExcersiseDone(false);
      setIsExcersiseFail(false);
    };
  }, [isFocused])

  useEffect(() => {
    setGameElements(getRandomExcersiseElements(excersiseElements, index, true));
    setIsFirstIterationEnded(false);
    setListenSoundNum(0);
    setUserCombination([]);
    setShoudMusicStart(false);
  }, [JSON.stringify(excersiseElements)])

  //Toggle start music when new elements
  useEffect(() => {
    if (gameElements[0] !== undefined) setShoudMusicStart(true)
  }, [JSON.stringify(gameElements)])

  //Sequence
  useEffect(() => {
    if (!isFirstIterationEnded) {
      if (gameElements[0] !== undefined) {
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
      <ImageBackground source={backSource} resizeMode="cover" style={stylesPage.backimage}>
        <ProgressBar counter={counter} max={excersise.repeat} />
        <LogoExcersise />
        {excersiseElements !== undefined &&
          <View style={stylesPage.excersiseContainer}>
            {
              excersiseElements.map((element, idx) =>
                <TouchableOpacity style={stylesPage.button} key={idx} disabled={!isFirstIterationEnded || isExcersiseFail} onPress={() => addToUserCombination(element)}>
                  <Image style={[isSmall ? stylesPage.imageButtonSmallTablet : stylesPage.imageButtonSmall , !isFirstIterationEnded && stylesPage.buttonDisabled]} source={rythmImages[element.id]}></Image>
                </TouchableOpacity>
              )
            }
          </View>
        }
        {isExcersiseFail && <RepeatButton repeatFunction={repeatSequence} />}
        {isExcersiseDone && <OkButton nextFunction={nextSequence} />}
        <View style={stylesPage.bottomContainer}>
          <AudioButton state={isFirstIterationEnded} repeatFunction={repeatSequence} />
          <NextButton state={isExcersiseDone} isFinished={isFinished} functionToDo={nextSequence} />
        </View>
      </ImageBackground>
    </View>
  );
}