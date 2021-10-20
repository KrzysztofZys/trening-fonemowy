import { useState, useEffect, useRef } from 'react';
import { useIsFocused } from "@react-navigation/native";
import * as React from 'react';
import { Text, View, Image, TouchableOpacity, ImageBackground, BackHandler } from 'react-native';
import { Audio } from 'expo-av';
import ProgressBar from '../../../elements/ProgressBar/ProgressBar';
import LogoExcersise from '../../../elements/LogoExcersise/LogoExcersise';
import RepeatButton from '../../../elements/Buttons/RepeatButton';
import OkButton from '../../../elements/Buttons/OkButton';
import AudioButton from '../../../elements/Buttons/AudioButton';
import NextButton from '../../../elements/Buttons/NextButton';
import stylesPage from '../Excersise.style';
import diceImages from '../../../importedImages/diceImages';
import whereLetterSounds from '../../../importedSounds/whereLetterSounds';
import whereSzSounds from '../../../importedSounds/whereSzSounds';
import whereCzSounds from '../../../importedSounds/whereCzSounds';
import whereRzSounds from '../../../importedSounds/whereRzSounds';
import whereDzSounds from '../../../importedSounds/whereDzSounds';

function getRandomElement(elements, usedLetters, setFunc) {
  let difNum = true;
  let rand = Math.floor(Math.random() * elements.length);
  console.log(usedLetters)

  while (difNum) {
    rand = Math.floor(Math.random() * elements.length);
    console.log(rand)

    let includes = false;
    for (let i = 0; i < usedLetters.length; i++) {
      if (usedLetters[i] === rand) includes = true;
    }

    if (!includes) {
      difNum = false
      setFunc([...usedLetters, rand]);
    }
  }
  return rand;
}

function getRandomGame(elements, number) {
  let difNum = true;
  let rand = Math.floor(Math.random() * elements.length);

  while (difNum) {
    rand = Math.floor(Math.random() * elements.length);

    if (number !== rand) {
      difNum = false
    }
  }
  return rand;
}

export default function Where({ route, navigation }) {
  const { excersise, index } = route.params;
  const isFocused = useIsFocused();
  const [counter, setCounter] = useState(0);
  const [shortCounter, setShortCounter] = useState(0);

  const [isTemp, setIsTemp] = useState(false);
  const [isTemp2, setIsTemp2] = useState(false);

  const [isExcersiseDone, setisExcersiseDone] = useState(false);
  const [isExcersiseFail, setIsExcersiseFail] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [letterChoose, setLetterChoose] = useState(false);
  const [usedLetters, setUsedLetters] = useState([]);

  const [excersiseElements, setExcersiseElements] = useState(10);
  const [gameElements, setGameElements] = useState([]);

  const [isFirstIterationEnded, setIsFirstIterationEnded] = useState(false);
  const [shoudMusicStart, setShoudMusicStart] = useState(false);

  const [Loaded, SetLoaded] = useState(false);
  const sound = useRef(new Audio.Sound());

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
    console.log('Load ' + data)
    if (data !== undefined) {
      if (checkLoading.isLoaded === false) {
        try {
          const result = await sound.current.loadAsync(data, {}, true);
          if (result.isLoaded === false) SetLoaded(false);
          else {
            sound.current.setOnPlaybackStatusUpdate(UpdateStatus);
            SetLoaded(true);
            setIsTemp2(!isTemp2)
          }
        } catch (error) {
          SetLoaded(false);
          console.log('Error:' + error)
        }
      }// } else SetLoaded(true);
    }
  };

  const UnloadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();

    if (checkLoading.isLoaded)
      if (checkLoading.isPlaying === false) {
        try {
          const result = await sound.current.unloadAsync();
          if (result.isLoaded === false) {
            SetLoaded(false);
            if (letterChoose) {
              console.log('Set first iter ended')
              setIsFirstIterationEnded(true)
            } else {
              setLetterChoose(true);
              setIsTemp(!isTemp);
            }
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
    if (isFinished) navigation.navigate('Trainings');
    else {
      setShortCounter(shortCounter + 1)
      setCounter(counter + 1);
      setisExcersiseDone(false);
      setIsFirstIterationEnded(false);
      if (excersiseElements === 0 && shortCounter < 4) {
        setGameElements(getRandomGame(whereSzSounds, gameElements));
        setShoudMusicStart(!shoudMusicStart)
      } else {
        setLetterChoose(false)
        setExcersiseElements(getRandomElement(whereLetterSounds, usedLetters, setUsedLetters))
      }
    }
  }

  const userPick = (element) => {
    switch (excersiseElements) {
      case 0:
        if ((gameElements < 8 && element === 1) ||
          (gameElements < 14 && gameElements > 7 && element === 2) ||
          (gameElements < 20 && gameElements > 13 && element === 3) ||
          (gameElements === 20 && element === 4)) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setIsExcersiseFail(true);
          break;
        }
      case 1:
        if ((gameElements === 0 && element === 1) ||
          (gameElements < 6 && gameElements > 0 && element === 2)) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setIsExcersiseFail(true);
          break;
        }
      case 2:
        if ((gameElements < 2 && element === 1) ||
          (gameElements < 4 && gameElements > 1 && element === 2) ||
          (gameElements === 4 && element === 4)) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setIsExcersiseFail(true);
          break;
        }
      case 3:
        if (element === 1) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setIsExcersiseFail(true);
          break;
        }
    }

  }

  useEffect(() => {
    if (counter === (excersise.repeat - 1)) setIsFinished(true)
  }, [counter])

  //Initial ExcersiseElements
  useEffect(() => {
    if (isFocused) {
      setCounter(0)
      setLetterChoose(false)
      setUsedLetters([]);
      setShortCounter(0)
      setIsFinished(false)
      setisExcersiseDone(false);
      setIsExcersiseFail(false);
      setIsFirstIterationEnded(false);
      setExcersiseElements(getRandomElement(whereLetterSounds, usedLetters, setUsedLetters))
    };
  }, [isFocused])

  //Toggle start music when new elements
  useEffect(() => {
    if (excersiseElements !== 10) {
      switch (excersiseElements) {
        case 0:
          setGameElements(getRandomGame(whereSzSounds, gameElements));
          break;
        case 1:
          setGameElements(getRandomGame(whereCzSounds, gameElements));
          break;
        case 2:
          setGameElements(getRandomGame(whereRzSounds, gameElements));
          break;
        case 3:
          setGameElements(getRandomGame(whereDzSounds, gameElements));
          break;
      }
      console.log('Toggle should music start')
      setShoudMusicStart(!shoudMusicStart);
    }
  }, [excersiseElements])

  //Sequence
  useEffect(() => {
    if (!isFirstIterationEnded) {
      if (excersiseElements !== 10) {
        if (!letterChoose) LoadAudio(whereLetterSounds[excersiseElements]);
        else {
          console.log('sequence letter choosen')
          console.log('game :' + gameElements)
          switch (excersiseElements) {
            case 0:
              LoadAudio(whereSzSounds[gameElements]);
              break;
            case 1:
              LoadAudio(whereCzSounds[gameElements]);
              break;
            case 2:
              LoadAudio(whereRzSounds[gameElements]);
              break;
            case 3:
              LoadAudio(whereDzSounds[gameElements]);
              break;
          }
        }
      }
    }
  }, [isTemp, shoudMusicStart])

  useEffect(() => {
    if (Loaded) {
      console.log('Play use effect')
      PlayAudio();
    }
  }, [isTemp2])

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
      <ImageBackground source={require('../../../../assets/backgrounds/Example.png')} resizeMode="cover" style={stylesPage.backimage}>
        <ProgressBar counter={counter} max={excersise.repeat} />
        <LogoExcersise />
        {gameElements !== undefined &&
          <View style={stylesPage.excersiseContainer}>
            {
              diceImages.map((dice, idx) =>
                <TouchableOpacity key={idx} style={stylesPage.button} disabled={!isFirstIterationEnded || isExcersiseFail} onPress={() => userPick(idx + 1)}>
                  <Image style={[stylesPage.imageButtonDice, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={dice}></Image>
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