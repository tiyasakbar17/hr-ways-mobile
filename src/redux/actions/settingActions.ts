import { TypedUseSelectorHook } from 'react-redux'
import { AllDispatchProp, iRender, iUpdateSetting } from '../../components/global/types/interfaces'
import { getLocalSetting, LOAD_LOCAL_SETTING, LOAD_LOCAL_TASK, setLocalSettig, SET_MODE } from '../../components/global/types/Types'
import { settingInitState, settingInnitialState } from '../reducers/settingReducer'
import { RootState } from '../store'
import { showLoading } from './popUpActions'

const loadLocalData: () => any = () => async (dispatch: AllDispatchProp) => {
    try {
        dispatch(showLoading(true))
        let pengaturanList = settingInnitialState, targetList: iRender[] = []
        const pengaturan = await getLocalSetting()

        if (pengaturan == null) {
            await setLocalSettig(settingInnitialState)
        } else {
            pengaturanList = JSON.parse(pengaturan)
        }
        dispatch({
            type: LOAD_LOCAL_SETTING,
            payload: pengaturanList
        })
        dispatch({
            type: LOAD_LOCAL_TASK,
            payload: targetList
        })
        dispatch(showLoading(false))
    } catch (error) {
        console.log(error)
        dispatch(showLoading(false))
    }
}

const ubahPengaturan: (props: iUpdateSetting) => any = ({ tipe, }) => async (dispatch: AllDispatchProp, getState: TypedUseSelectorHook<RootState>) => {
    try {
        const { settings: setting }: { settings: settingInitState } = getState(state => state.settings)
        dispatch({
            type: SET_MODE,
        })
        await setLocalSettig({
            ...setting,
            darkMode: !setting.darkMode
        })
    } catch (error) {
        console.log(error);
    }
}


export { loadLocalData, ubahPengaturan }