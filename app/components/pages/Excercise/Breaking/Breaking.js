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
import getRandomElementBreaking from '../../../../utils/functions/getRandomElementBreaking';
import diceImages from '../../../importedImages/diceImages';
import breakingSoundsEasy from '../../../importedSounds/breakingSoundsEasy';
import breakingSoundsHard from '../../../importedSounds/breakingSoundsHard';

export default function Breaking({ route, navigation }) {
  const { excersise, index, name, points, trainings } = route.params;
  const [pointsLocal, setPointsLocal] = useState(points);
  const isFocused = useIsFocused();
  const [counter, setCounter] = useState(0);

  const [isExcersiseDone, setisExcersiseDone] = useState(false);
  const [isExcersiseFail, setIsExcersiseFail] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [excersiseElements, setExcersiseElements] = useState([]);

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
      console.log('Error: ' + error);
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
      console.log('Error: ' + error);
    }
  };

  const PlayAudio = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      if (result.isLoaded && result.isPlaying === false) sound.current.playAsync();
    } catch (error) {
      console.log('Error:' + error)
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
          SetLoaded(false);
          console.log('Error:' + error)
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
            setIsFirstIterationEnded(true);
            SetLoaded(false);
          }
        } catch (error) {
          console.log('error ' + error)
        }
      }
  }

  const repeatSequence = () => {
    setShoudMusicStart(!shoudMusicStart)
    setIsFirstIterationEnded(false)
    setIsExcersiseFail(false)
  }

  const nextSequence = () => {
    if (isFinished) {
      if (name === undefined) navigation.navigate('Trainings')
      else {
        excersiseInfo = trainings[5]
        const indexInfo = 0
        const pointsInfo = pointsLocal
        navigation.navigate('Info', { excersiseInfo, indexInfo, name, pointsInfo, trainings })
      }
    }
    else {
      if (index === 0) setExcersiseElements(getRandomElementBreaking(breakingSoundsEasy, excersiseElements.sound, index))
      else setExcersiseElements(getRandomElementBreaking(breakingSoundsHard, excersiseElements.sound, index))
      setCounter(counter + 1)
      setisExcersiseDone(false);
      setIsFirstIterationEnded(false)
    }
  }

  const userPick = (element) => {
    console.log(index)
    console.log('pick' + element)
    console.log('value' + excersiseElements.value)
    if (element === excersiseElements?.value) {

      setIsExcersiseFail(false);
      setisExcersiseDone(true);
    } else {
      setPointsLocal(pointsLocal + 1)
      setIsExcersiseFail(true);
    }
  }

  useEffect(() => {
    if (counter === (excersise.repeat - 1)) setIsFinished(true)
  }, [counter])

  //Initial ExcersiseElements
  useEffect(() => {
    if (isFocused) {
      if (index === 0) setExcersiseElements(getRandomElementBreaking(breakingSoundsEasy, excersiseElements.sound, index))
      else setExcersiseElements(getRandomElementBreaking(breakingSoundsHard, excersiseElements.sound, index))
      setCounter(0)
      setIsFinished(false)
      setisExcersiseDone(false);
      setIsExcersiseFail(false);
      setIsFirstIterationEnded(false);
    };
  }, [isFocused])

  //Toggle start music when new elements
  useEffect(() => {
    if (excersiseElements !== undefined) setShoudMusicStart(!shoudMusicStart);
  }, [JSON.stringify(excersiseElements)])

  //Sequence
  useEffect(() => {
    if (!isFirstIterationEnded) {
      if (excersiseElements.sound !== undefined) {
        if (index === 0) LoadAudio(breakingSoundsEasy[excersiseElements.sound])
        else LoadAudio(breakingSoundsHard[excersiseElements.sound])
        PlayAudio()
      }
    }
  }, [Loaded, shoudMusicStart])

  //Prevent from going back when music is on
  useEffect(() => {
    const backAction = () => {
      if (isFirstIterationEnded) return false;
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
              diceImages.map((dice, idx) =>
                <TouchableOpacity key={idx} style={stylesPage.button} disabled={!isFirstIterationEnded || isExcersiseFail} onPress={() => userPick(idx + 1)}>
                  <Image style={[isSmall ? stylesPage.imageButtonDiceTablet : stylesPage.imageButtonDice, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={dice}></Image>
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