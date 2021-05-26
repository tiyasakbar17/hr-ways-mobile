import { TypedUseSelectorHook } from "react-redux";
import { AllDispatchProp, iRender } from "../../components/global/types/interfaces";
import { SET_TASK } from "../../components/global/types/Types";
import { RootState } from "../store";
import { showLoading } from "./popUpActions";
import { uuidv4 } from '../../components/global/types/functions'

interface itemTugas {
    namaTarget: string;
    catatan?: string;
    waktuDibuat: Date;
    waktuSelesai?: Date | null;
}

const tambahTarget: (item: itemTugas) => any = (item) => async (dispatch: AllDispatchProp, getState: TypedUseSelectorHook<RootState>) => {
    try {
        dispatch(showLoading(true))
        const { task: tasks }: { task: iRender[] } = getState(state => state.task)

        const newTask: iRender[] = [{
            ...item,
            id: uuidv4()
        }, ...tasks.slice(0)]

        dispatch({
            type: SET_TASK,
            payload: newTask
        })
        dispatch(showLoading(false))
    } catch (error) {
        console.log(error);
        dispatch(showLoading(false))
    }
}
const editTarget: (data: iRender) => any = (data) => async (dispatch: AllDispatchProp, getState: TypedUseSelectorHook<RootState>) => {
    try {
        dispatch(showLoading(true))
        const { task: tasks }: { task: iRender[] } = getState(state => state.task)

        const indextasks = [...tasks].findIndex(item => item.id == data.id);
        const newtasks: iRender[] =
            tasks[indextasks].waktuSelesai === null
                ? [
                    ...tasks.slice(0, indextasks),
                    ...tasks.slice(indextasks + 1),
                    {
                        ...tasks[indextasks],
                        namaTarget: data.namaTarget,
                        catatan: data.catatan
                    },
                ]
                : [
                    {
                        ...tasks[indextasks],
                        waktuSelesai: null,
                    },
                    ...tasks.slice(0, indextasks),
                    ...tasks.slice(indextasks + 1),
                ];
        dispatch({
            type: SET_TASK,
            payload: newtasks
        })
        dispatch(showLoading(false))
    } catch (error) {
        console.log(error);
        dispatch(showLoading(false))
    }
}
const hapusTarget: (id: string) => any = (id) => async (dispatch: AllDispatchProp, getState: TypedUseSelectorHook<RootState>) => {
    try {
        dispatch(showLoading(true))
        const tasks: iRender[] = getState(state => state.task)
        const newTask: iRender[] = tasks.filter(item => item.id != id)
        dispatch({
            type: SET_TASK,
            payload: newTask
        })
        dispatch(showLoading(false))
    } catch (error) {
        console.log(error);
        dispatch(showLoading(false))
    }
}

const ubahData: (item: iRender[]) => any = (item) => async (dispatch: AllDispatchProp) => {
    try {
        dispatch(showLoading(true))
        dispatch({
            type: SET_TASK,
            payload: item
        })
        dispatch(showLoading(false))
    } catch (error) {
        console.log(error);
        dispatch(showLoading(false))
    }
}

export { tambahTarget, hapusTarget, editTarget, ubahData }