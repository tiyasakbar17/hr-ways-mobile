import { CLOSE_POPUP, SHOW_LOADING, SHOW_POPUP } from "../../components/global/types/Types";

const showLoading = (payload: boolean) => ({
    type: SHOW_LOADING,
    payload
})

const showPopUp = ({ message, redir }: { message: string, redir?: boolean }) => ({
    type: SHOW_POPUP,
    payload: { message, redir }
})

const closePopUp = {
    type: CLOSE_POPUP
}

export { showLoading, showPopUp, closePopUp }