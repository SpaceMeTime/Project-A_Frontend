import React, {useEffect, useState} from 'react';
import {Vibration} from 'react-native';
import {
  NativeBaseProvider,
  ScrollView,
  Center,
  HStack,
  VStack,
  Heading,
  Input,
  Select,
  Switch,
  Button,
  Image,
} from 'native-base';
import TimePicker from 'react-native-wheel-time-picker';
import moment from 'moment';
import Sound from 'react-native-sound';
import Alarm from 'react-native-alarm-manager';
import {
  loadListModal,
  loadModifyModal,
  loadContactModal,
  loadOpenSourceModal,
} from './Modal';

const AlarmSetting = props => {
  const hours = [];
  const minutes = [];
  const [modifyId, setModifyId] = useState(null);
  const [createDate, setCreateDate] = useState(new Date());
  const [modifyDate, setModifyDate] = useState(null);
  const [modifyTitle, setModifyTitle] = useState(null);
  const [modifyText, setModifyText] = useState(null);
  const [createSound, setCreateSound] = useState('0');
  const [modifySound, setModifySound] = useState(null);
  const [createIcon, setCreateIcon] = useState('0');
  const [modifyIcon, setModifyIcon] = useState(null);
  const [createSoundLoop, setCreateSoundLoop] = useState(true);
  const [modifySoundLoop, setModifySoundLoop] = useState(null);
  const [createVibration, setCreateVibration] = useState(true);
  const [modifyVibration, setModifyVibration] = useState(null);
  const [createNotiRemovable, setCreateNotiRemovable] = useState(true);
  const [modifyNotiRemovable, setModifyNotiRemovable] = useState(null);
  const [soundPlayerList, setSoundPlayerList] = useState(null);
  const [listModal, setListModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  const [openSourceModal, setOpenSourceModal] = useState(false);
  const [alarmList, setAlarmList] = useState([]);

  const soundList = ['adventure', 'bliss', 'the_inspiration'];
  const iconList = ['공부', '동기부여', '운동'];

  for (let i = 1; i <= 12; i++) hours.push(i + '');

  for (let i = 0; i < 60; i++) {
    if (i >= 0 && i < 10) minutes.push('0' + i);
    else minutes.push(i + '');
  }

  useEffect(() => {
    const soundPlayers = [];

    for (let i = 0; i < 3; i++)
      soundPlayers.push(new Sound(soundList[i] + '.mp3', Sound.MAIN_BUNDLE));

    setSoundPlayerList(soundPlayers);
  }, []);

  const dateToTime = currDate => {
    return moment(currDate).format('HH:mm:00') + '';
  };

  const selectCreateSound = value => {
    soundPlayerList[createSound].stop();
    setCreateSound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleCreateVibration = () => {
    setCreateVibration(!createVibration);
    if (!createVibration) Vibration.vibrate();
  };

  const selectModifySound = value => {
    soundPlayerList[modifySound].stop();
    setModifySound(value);
    soundPlayerList[value].setVolume(1.0).play();
  };

  const toggleModifyVibration = () => {
    setModifyVibration(!modifyVibration);
    if (!modifyVibration) Vibration.vibrate();
  };

  const openModifyModal = alarm => {
    const date = new Date();
    const tmpAlarmTime = alarm.alarm_time.split(':');

    date.setHours(tmpAlarmTime[0]);
    date.setMinutes(tmpAlarmTime[1]);
    date.setSeconds(tmpAlarmTime[2]);

    setModifyDate(date);

    for (let i = 0; i < soundList.length; i++) {
      if (soundList[i] == alarm.alarm_sound) {
        setModifySound(i + '');
        break;
      }
    }

    for (let i = 0; i < iconList.length; i++) {
      if (iconList[i] == alarm.alarm_icon) {
        setModifyIcon(i + '');
        break;
      }
    }

    setModifyId(alarm.alarm_id);
    setModifyTitle(alarm.alarm_title);
    setModifyText(alarm.alarm_text);
    setModifySoundLoop(alarm.alarm_sound_loop);
    setModifyVibration(alarm.alarm_vibration);
    setModifyNotiRemovable(alarm.alarm_noti_removable);
    setModifyModal(true);
  };

  const closeModifyModal = () => {
    soundPlayerList[modifySound].stop();
    setModifyModal(false);
  };

  const toggleAlarm = id => {
    let tmpAlarm = null;

    const tmpAlarmList = alarmList.map(item => {
      if (id == item.alarm_id) {
        tmpAlarm = {...item, alarm_activate: !item.alarm_activate};
        return tmpAlarm;
      } else return item;
    });

    setAlarmList(tmpAlarmList);

    Alarm.modify(
      tmpAlarm,
      () => {},
      fail => alert(fail),
    );
  };

  const showList = () => {
    Alarm.searchAll(
      success => {
        soundPlayerList[createSound].stop();
        setAlarmList(success);
        setListModal(true);
      },
      fail => alert(fail),
    );
  };

  const createAlarm = () => {
    const alarmInfo = {
      alarm_time: dateToTime(createDate),
      alarm_sound: soundList[createSound],
      alarm_icon: iconList[createIcon],
      alarm_sound_loop: createSoundLoop,
      alarm_vibration: createVibration,
      alarm_noti_removable: createNotiRemovable,
      alarm_activate: true,
    };

    Alarm.schedule(
      alarmInfo,
      success => alert(success),
      fail => alert(fail),
    );
  };

  const modifyAlarm = () => {
    const alarmInfo = {
      alarm_id: modifyId,
      alarm_time: dateToTime(modifyDate),
      alarm_sound: soundList[modifySound],
      alarm_icon: iconList[modifyIcon],
      alarm_sound_loop: modifySoundLoop,
      alarm_vibration: modifyVibration,
      alarm_noti_removable: modifyNotiRemovable,
      alarm_activate: true,
    };

    Alarm.modify(
      alarmInfo,
      success1 => {
        Alarm.searchAll(
          success2 => {
            soundPlayerList[modifySound].stop();
            setAlarmList(success2);
            setModifyModal(false);
            alert(success1);
          },
          fail => alert(fail),
        );
      },
      fail => alert(fail),
    );
  };

  const deleteAlarm = (id, idx) => {
    Alarm.delete(
      id,
      () => {
        const list = alarmList.slice();
        list.splice(idx, 1);
        setAlarmList(list);
      },
      fail => alert(fail),
    );
  };

  const stopAlarm = () => {
    Alarm.stop(
      success => alert(success),
      fail => alert(fail),
    );
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Center>
          {loadListModal(
            listModal,
            alarmList,
            openModifyModal,
            deleteAlarm,
            toggleAlarm,
            setListModal,
          )}
          {loadModifyModal(
            modifyModal,
            modifyDate,
            hours,
            minutes,
            modifyTitle,
            modifyText,
            modifySound,
            iconList,
            modifyIcon,
            modifySoundLoop,
            modifyVibration,
            modifyNotiRemovable,
            closeModifyModal,
            setModifyDate,
            setModifyTitle,
            setModifyText,
            selectModifySound,
            setModifyIcon,
            setModifySoundLoop,
            toggleModifyVibration,
            setModifyNotiRemovable,
            modifyAlarm,
          )}
          {loadContactModal(contactModal, setContactModal)}
          {loadOpenSourceModal(openSourceModal, setOpenSourceModal)}
          <VStack space={8}>
            <TimePicker
              initDate={createDate}
              hours={hours}
              minutes={minutes}
              onTimeSelected={currDate => setCreateDate(currDate)}
              style={{height: 200, width: 150}}
              itemTextSize={25}
              selectedItemTextSize={40}
              selectedItemTextColor={'#333333'}
              itemTextColor={'#bbbbbb'}
              hideIndicator
            />
            
            <Heading size="md">Sound</Heading>
            <Select
              selectedValue={createSound}
              onValueChange={value => selectCreateSound(value)}>
              <Select.Item label="Adventure" value="0" />
              <Select.Item label="Bliss" value="1" />
              <Select.Item label="The Inspiration" value="2" />
            </Select>
            <HStack justifyContent="space-between" style={{marginTop: 10}}>
              <Heading size="md">명언주제</Heading>
              <HStack>
                <Image
                  source={{uri: iconList[0]}}
                  style={{marginRight: 10}}
                />
                <Image
                  source={{uri: iconList[1]}}
                  style={{marginRight: 10}}
                />
                <Image
                  source={{uri: iconList[2]}}
                  style={{marginRight: 10}}
                />
              </HStack>
            </HStack>
            <Select
              selectedValue={createIcon}
              onValueChange={value => setCreateIcon(value)}>
              <Select.Item label="공부" value="0" />
              <Select.Item label="동기부여" value="1" />
              <Select.Item label="운동" value="2" />
            </Select>
            <HStack justifyContent="space-between" style={{marginTop: 10}}>
              <Heading size="md">소리 반복</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createSoundLoop}
                onToggle={() => setCreateSoundLoop(!createSoundLoop)}
              />
            </HStack>
            <HStack justifyContent="space-between">
              <Heading size="md">진동</Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createVibration}
                onToggle={() => toggleCreateVibration()}
              />
            </HStack>
            <HStack justifyContent="space-between">
              <Heading size="md">푸쉬알림 제거                      </Heading>
              <Switch
                size="lg"
                colorScheme="emerald"
                isChecked={createNotiRemovable}
                onToggle={() => setCreateNotiRemovable(!createNotiRemovable)}
              />
            </HStack>
            <Button
              onPress={() => createAlarm()}
              style={{marginTop: 10, marginBottom: 30, fontSize:20}}>
              저장
            </Button>
          </VStack>
        </Center>
        <HStack
          justifyContent="flex-end"
          style={{marginRight: 10, marginBottom: 10}}>
        </HStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default AlarmSetting;