import IdleTimerManager from 'react-native-idle-timer';
import SoundPlayer from 'react-native-sound-player';
import { ichangeHandler, iKeepAwake } from './interfaces';


const changeHandler = ({ name, value, setstate, initState }: ichangeHandler) => {
    setstate((prev: typeof initState) => ({ ...prev, [name]: value }));
};

const keepAwake = ({ awake }: iKeepAwake) => {
    IdleTimerManager.setIdleTimerDisabled(awake)
}

const playSound = async (tipe: 'clicked' | 'rings') => {
    try {
        SoundPlayer.playSoundFile(tipe, 'wav')
    } catch (error) {
        console.log(error);
    }
}

const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export { changeHandler, keepAwake, playSound, uuidv4 }