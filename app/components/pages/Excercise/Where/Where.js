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
import diceImages from '../../../importedImages/diceImages';
import where2Images from '../../../importedImages/where2Images';
import where3Images from '../../../importedImages/where3Images';
import where4Images from '../../../importedImages/where4Images';
import whereLetterSounds from '../../../importedSounds/whereLetterSounds';
import whereSzSounds from '../../../importedSounds/whereSzSounds';
import whereCzSounds from '../../../importedSounds/whereCzSounds';
import whereRzSounds from '../../../importedSounds/whereRzSounds';
import whereDzSounds from '../../../importedSounds/whereDzSounds';
import { storageConstants } from '../../../../constants/storageConstants';
import { saveData, readData } from '../../../../services/storageService';

function getRandomElement(elements, usedLetters, setFunc) {
  let difNum = true;
  let rand = Math.floor(Math.random() * elements.length);
  console.log(usedLetters)

  while (difNum) {
    rand = Math.floor(Math.random() * elements.length);
    console.log(rand)

    let includes = false;
    for (let i = 0; i < usedLetters.length; i++) {
      if (usedLetters[i] === rand) {
        includes = true;
      }
      console.log(usedLetters[i]);
    }

    if (!includes) {
      difNum = false
      setFunc([...usedLetters, rand]);
    }

    console.log('while loop')
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
  const { excersise, index, name, points, trainings } = route.params;
  const [pointsLocal, setPointsLocal] = useState(points);
  const [tableData, setTableData] = useState();
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

  const [Loaded, SetLoaded] = useState(false);
  const sound = useRef(new Audio.Sound());

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [isSmall, setIsSmall] = useState(false);

  const cleanData = () => {
    setCounter(0)
    setLetterChoose(false)
    setUsedLetters([])
    setShortCounter(0)
    setIsFinished(false)
    setisExcersiseDone(false);
    setIsExcersiseFail(false);
    setIsFirstIterationEnded(false);
    setExcersiseElements(10)
    setPointsLocal(0)
    console.log('sprztam')
  }

  useEffect(() => {
    if ((windowHeight / windowWidth) < 1.7) setIsSmall(true);
  }, [])

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
          if (letterChoose) {
            console.log('Set first iter ended')
            setIsFirstIterationEnded(true)
          } else {
            setLetterChoose(true);
            setIsTemp(!isTemp);
          }
          if (result.isLoaded === false) {
            SetLoaded(false);

          }
        } catch (error) {
          console.log('error ' + error)
        }
      }
  }

  const repeatSequence = () => {
    setIsTemp(!isTemp)
    setIsFirstIterationEnded(false)
    setIsExcersiseFail(false)
  }

  const nextSequence = () => {
    if (isFinished) {
      if (name === undefined) {
        navigation.navigate('Trainings')
        cleanData();
      }
      else {
        try {
          let newTable;
          if (tableData === '' || tableData === undefined || tableData?.length === 0) {
            console.log(tableData)
            console.log('no data from table')
            newTable = [];
          } else newTable = tableData;
          console.log('save data to new table')
          console.log(tableData)
          
          const newUser = {
            'name': name,
            'result': pointsLocal
          }
          newTable = [...newTable, newUser]
          console.log('saving data to table')
          saveData(storageConstants.RESULT, JSON.stringify(newTable))
          console.log(tableData)
          cleanData();
          navigation.navigate('Trainings')
        } catch (e) {
          console.log(e)
        }
        
      }
    }
    else {
      if (excersiseElements === 0) setShortCounter(shortCounter + 1);
      setCounter(counter + 1);
      setisExcersiseDone(false);
      setIsFirstIterationEnded(false);
      console.log('Short: ' + shortCounter)
      if (excersiseElements === 0 && shortCounter < 5) {
        setGameElements(getRandomGame(whereSzSounds, gameElements));
        setIsTemp(!isTemp)
        console.log('new game elements')
      } else {
        console.log('letter choose false')
        setLetterChoose(false)
        setExcersiseElements(getRandomElement(whereLetterSounds, usedLetters, setUsedLetters))
      }
    }
  }

  const userPick = (element) => {
    console.log('Game: ' + gameElements + ' Exc: ' + excersiseElements + ' Pick: ' + element)
    switch (excersiseElements) {
      case 0:
        if ((element === 0 && (gameElements < 4 || gameElements === 9 || gameElements === 10)) ||
          (element === 1 && ((gameElements > 3 && gameElements < 8) || (gameElements > 10 && gameElements < 15))) ||
          (element === 2 && ((gameElements === 8) || (gameElements > 14 && gameElements < 20))) ||
          (element === 3 && gameElements === 20)
        ) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setPointsLocal(pointsLocal + 1)
          setIsExcersiseFail(true);
          break;
        }
      case 1:
        if ((element === 0 && gameElements === 0) ||
          (element === 1 && ((gameElements > 0 && gameElements < 3) || gameElements > 3 )) ||
          (element === 2 && gameElements === 3)
        ) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setPointsLocal(pointsLocal + 1)
          setIsExcersiseFail(true);
          break;
        }
      case 2:
        if ((element === 0 && gameElements === 2) ||
          (element === 1 && (gameElements < 2 || gameElements > 2 )) ||
          (element === 3 && gameElements === 4)
        ) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setPointsLocal(pointsLocal + 1)
          setIsExcersiseFail(true);
          break;
        }
      case 3:
        if ((element === 0 && gameElements < 2) ||
          (element === 1 && gameElements > 1)
        ) {
          setIsExcersiseFail(false);
          setisExcersiseDone(true);
          break;
        } else {
          setPointsLocal(pointsLocal + 1)
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
      readData(storageConstants.RESULT).then(value => {
        if (value == null) console.log('blaba')
        else setTableData(JSON.parse(value))
      }
      )
      setLetterChoose(false)
      setShortCounter(0)
      setIsFinished(false)
      setisExcersiseDone(false);
      setIsExcersiseFail(false);
      setIsFirstIterationEnded(false);
      setExcersiseElements(getRandomElement(whereLetterSounds, usedLetters, setUsedLetters))
      setPointsLocal(points)
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
      setIsTemp(!isTemp);
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
  }, [isTemp])

  useEffect(() => {
    console.log('Play use effect')
    PlayAudio();
  }, [isTemp2])

  //Prevent from going back when music is on
  useEffect(() => {
    const backAction = () => {
      if (isFirstIterationEnded && name === undefined) {
        cleanData()
        return false
      };
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isFirstIterationEnded, name]);

  if (excersise === undefined) return <View style={stylesPage.container}><Text style={stylesPage.mainText}>No data</Text></View>

  return (
    <View style={stylesPage.container}>
      <ImageBackground source={backSource} resizeMode="cover" style={stylesPage.backimage}>
        <ProgressBar counter={counter} max={excersise.repeat} />
        <LogoExcersise />
        {gameElements !== undefined &&
          <View style={stylesPage.excersiseContainer}>
            {((excersiseElements === 0 && gameElements < 9) ||
              excersiseElements === 1 && gameElements < 4 ||
              excersiseElements === 2 && gameElements < 2 ||
              excersiseElements === 3)
              &&
              where2Images.map((image, idx) =>
                <TouchableOpacity key={idx} style={stylesPage.button} disabled={!isFirstIterationEnded || isExcersiseFail || isExcersiseDone} onPress={() => userPick(idx)}>
                  <Image style={[isSmall ? stylesPage.imageButtonWhere2Tablet : stylesPage.imageButtonWhere3, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={image}></Image>
                </TouchableOpacity>
              )
            }
            {((excersiseElements === 0 && (gameElements > 8 && gameElements < 20)) ||
              excersiseElements === 1 && gameElements > 3 ||
              excersiseElements === 2 && (gameElements === 2 || gameElements === 3))
              &&
              where3Images.map((image, idx) =>
                <TouchableOpacity key={idx} style={stylesPage.button} disabled={!isFirstIterationEnded || isExcersiseFail || isExcersiseDone} onPress={() => userPick(idx)}>
                  <Image style={[isSmall ? stylesPage.imageButtonWhere3Tablet : stylesPage.imageButtonWhere3, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={image}></Image>
                </TouchableOpacity>
              )
            }
            {((excersiseElements === 0 && gameElements > 19) ||
              excersiseElements === 2 && gameElements == 4)
              &&
              where4Images.map((image, idx) =>
                <TouchableOpacity key={idx} style={stylesPage.button} disabled={!isFirstIterationEnded || isExcersiseFail || isExcersiseDone} onPress={() => userPick(idx)}>
                  <Image style={[isSmall ? stylesPage.imageButtonWhere4Tablet : stylesPage.imageButtonWhere4, !isFirstIterationEnded && stylesPage.buttonDisabled]} source={image}></Image>
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